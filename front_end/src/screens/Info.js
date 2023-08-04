import React, { useState } from "react";
import { Avatar, Button, Divider, Form, Input, Radio, Row, Spin, Upload, notification } from "antd";
import { useHistory } from "react-router-dom";
import { AiOutlineUser } from 'react-icons/ai'
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import moment from "moment";

import logo from '../asset/image/logo_login.png';
import { getBase64 } from "../utils/function";
import DateComponent from "../components/date";
import { storage } from '../service/firebase';

import styles from '../asset/scss/info.module.scss';
import { post } from "../service/axios/instance";

const { Search } = Input;

const InfoScreen = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [searchBox, setSearchBox] = useState(null);
  const [location, setLocation] = useState({
    lat: 21.028511,
    lng: 105.804817
  })
  const [fileSource, setFileSource] = useState();
  const [url, setUrl] = useState('')
  const [valueDate, setValueDate] = useState('');
  const [valueAddress, setValueAddress] = useState('');



  const onChangeImage = (info) => {
    if (info.file.status !== "uploading") {
      const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
      if (!isJpgOrPng) {
        return notification.error({ message: 'Không phải định dạng hình ảnh, vui lòng chọn ảnh JPEG hoặc PNG' })

      }
      const isLt1M = info.file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        return notification.error({ message: 'Ảnh cần nhỏ hơn 1MB' })
      }
      setFileSource(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setUrl(url);
      });
    }
  };

  const handleComplete = (value) => {
    const newData = {
      ...value,
      address: valueAddress,
      birthday: moment(valueDate, 'DD/MM/YYYY')
    }
    if (fileSource) {
      const storageRef = ref(storage, fileSource?.uid);
      const uploadAvatar = uploadBytesResumable(storageRef, fileSource);
      uploadAvatar.on('state_changed', (snapshot) => { },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadAvatar.snapshot.ref)
            .then(data => {
              if (valueDate) {
                newData.avatarUrl = data
              } else {
                newData.avatarUrl = data;
              }
            })
          post('update_profile', newData)
            .then(() => {
              notification.success({ message: 'Lưu thành công' });
              window.location.href = '/home'
            })
            .catch(() => {
              notification.error({ message: 'Đã xảy ra lỗi' });
            })
        }
      )
    } else {
      post('update_profile', newData)
        .then(() => {
          notification.success({ message: 'Lưu thành công' });
          window.location.href = '/home'
        })
        .catch(() => {
          notification.error({ message: 'Đã xảy ra lỗi' });
        })
    }
  }

  const onPlacesChanged = () => {
    form.setFieldsValue({ address: searchBox.getPlaces()[0].formatted_address })
    setValueAddress(searchBox.getPlaces()[0].formatted_address)
    const locationCurrent = {
      lat: searchBox.getPlaces()[0].geometry.location.lat(),
      lng: searchBox.getPlaces()[0].geometry.location.lng()
    }
    setLocation(locationCurrent)
  }

  return (
    <div>
      <div className={styles.bg}>
        <Spin spinning={loading}>
          <Form
            form={form}
            onFinish={handleComplete}
            className={styles.wrapperForm}
            layout='vertical'
            initialValues={
              {
                gender: 1,
                birthday: moment().format('DD/MM/YYYY')
              }
            }
          >
            <Row align='middle' justify='space-between'>
              <img
                src={logo}
                className={styles.logo}
                onClick={() => history.push('/')}
                alt='logo'
              />
              <span className={styles.title}>Đăng ký thông tin</span>
            </Row>
            <Divider />
            <Row justify='center' className={styles.wrapperAvatar}>
              <Upload onChange={onChangeImage} maxCount={1} showUploadList={false}>
                {url ?
                  <Avatar size={100} src={url} style={{ cursor: 'pointer' }} /> :
                  <Avatar size={100} icon={<AiOutlineUser />} style={{ cursor: 'pointer' }} />
                }
              </Upload>
            </Row>
            <Form.Item name='name' label='Tên người dùng' rules={[
              {
                required: true,
                message: 'Bạn cần nhập trường này'
              }
            ]}>
              <Input className={styles.input} placeholder='Nhập tên người dùng' />
            </Form.Item>

            <Form.Item name='birthday' label='Ngày sinh'>
              <DateComponent setValueDate={setValueDate} />
            </Form.Item>

            <Form.Item name='gender' label='Giới tính'>
              <Radio.Group defaultValue={1}>
                <Radio value={1}>Nam</Radio>
                <Radio value={2}>Nữ</Radio>
                <Radio value={0}>Khác</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name='address' label='Địa chỉ' rules={[
              {
                required: true,
                message: 'Bạn cần điền trường này'
              }
            ]}>
              <LoadScript id='script-loader' googleMapsApiKey={process.env.REACT_APP_API_KEY_GG_MAP} libraries={['places']}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: 200 }}
                  center={{ lat: location.lat, lng: location.lng }}
                  zoom={15}
                  options={
                    {
                      streetViewControl: false,
                      zoomControl: false,
                      fullscreenControl: false,
                      mapTypeControl: false
                    }
                  }
                >
                  <Marker position={{ lat: location.lat, lng: location.lng }} />
                  <StandaloneSearchBox
                    onLoad={(value) => setSearchBox(value)}
                    onPlacesChanged={onPlacesChanged}
                  >
                    <Search placeholder='Nhập địa chỉ của bạn' value={valueAddress} onChange={(e) => setValueAddress(e.target.value)} />
                  </StandaloneSearchBox>
                </GoogleMap>
              </LoadScript>
            </Form.Item>

            <Button className={styles.button_verify} htmlType='submit'>Hoàn Tất</Button>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

export default InfoScreen;