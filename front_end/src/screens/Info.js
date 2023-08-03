import React, { useState } from "react";
import { Avatar, Button, Divider, Form, Input, Radio, Row, Space, Spin, Upload, notification } from "antd";
import { useHistory } from "react-router-dom";
import { AiOutlineUser } from 'react-icons/ai'
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api'

import logo from '../asset/image/logo_login.png';

import styles from '../asset/scss/info.module.scss';
import { getBase64 } from "../utils/function";
import DateComponent from "../components/date";

const InfoScreen = () => {
  const history = useHistory();

  const [loadingImage, setLoadingImage] = useState(true);
  const [url, setUrl] = useState('')
  const [valueDate, setValueDate] = useState('');

  console.log(process.env.REACT_APP_API_KEY_GG_MAP)

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

      getBase64(info.file.originFileObj, (url) => {
        setUrl(url);
      })
    }
  };

  const handleComplete = (value) => {

  }

  const onSearchBoxLoad = (value) => {
    console.log(value)
  }

  const onPlacesChanged = (value) => {
    console.log(value)
  }

  return (
    <div>
      <div className={styles.bg}>
        <Form
          onFinish={handleComplete}
          className={styles.wrapperForm}
          layout='vertical'
          initialValues={
            {
              gender: 1
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
          <Form.Item name='name' label='Tên người dùng'>
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

          <Form.Item name='address' label='Địa chỉ'>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY_GG_MAP}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: 100 }}
                center={{ lat: 21.028511, lng: 105.804817 }}
                zoom={10}
              />
            </LoadScript>
          </Form.Item>

          <Button className={styles.button_verify} htmlType='submit'>Hoàn Tất</Button>
        </Form>
      </div>
    </div>
  )
}

export default InfoScreen;