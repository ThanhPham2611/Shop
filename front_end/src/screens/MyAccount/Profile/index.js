import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Divider, Form, Input, Radio, Row, Spin, Upload, notification } from "antd";
import { UserOutlined } from '@ant-design/icons';
import moment from "moment";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux'

import { getBase64, hiddenEmail, hiddenPhone } from "../../../utils/function";
import { storage } from '../../../service/firebase';
import DateComponent from "../../../components/date";
import { post } from '../../../service/axios/instance';

import styles from './profile.module.scss';

const ProfileScreen = () => {
  const { userData } = useSelector(state => state.userInfo);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [url, setUrl] = useState('');
  const [valueDate, setValueDate] = useState('');
  const [fileSource, setFileSource] = useState();

  useEffect(() => {
    setUrl(userData?.avatarUrl)
  }, [userData])

  const onChangeImage = (info) => {
    setLoading(true);
    setFileSource(info?.file?.originFileObj);
    if (info.file.status !== "uploading") {
      const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
      if (!isJpgOrPng) {
        setLoading(false);
        return notification.error({ message: 'Không phải định dạng hình ảnh, vui lòng chọn ảnh JPEG hoặc PNG' })

      }
      const isLt1M = info.file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        setLoading(false);
        return notification.error({ message: 'Ảnh cần nhỏ hơn 1MB' })
      }

      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setUrl(url);
      })
    }
  }

  const handleComplete = (value) => {
    setLoadingSave(true)
    const newData = {
      ...value
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
                newData.birthday = moment(valueDate, 'DD/MM/YYYY')
                newData.avatarUrl = data
              } else {
                newData.avatarUrl = data;
              }
            })
          post('update_profile', newData)
            .then(() => {
              setLoadingSave(false);
              notification.success({ message: 'Lưu thành công' });
            })
            .catch(() => {
              setLoadingSave(false);
              notification.error({ message: 'Đã xảy ra lỗi' });
            })
        }
      )
      return;
    } else {
      if (valueDate) {
        newData.birthday = moment(valueDate, 'DD/MM/YYYY')
      }
      post('update_profile', newData)
        .then(() => {
          setLoadingSave(false);
          notification.success({ message: 'Lưu thành công' });
        })
        .catch(() => {
          setLoadingSave(false);
          notification.error({ message: 'Đã xảy ra lỗi' });
        })
    }
  }

  return Object.keys(userData).length > 0 ? (
    <div>
      <h1>Hồ sơ của tôi</h1>
      <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      <Divider />

      <Form
        form={form}
        onFinish={handleComplete}
        className={styles.wrapperForm}
        labelCol={{ xxl: 8 }}
        wrapperCol={{ xxl: 16 }}
        initialValues={{
          birthday: userData?.birthday,
          name: userData?.name,
          gender: userData?.gender
        }}
      >
        <Row justify='space-between'>
          <Col xxl={14} className={styles.containerLeft}>
            <Form.Item label='Tên đăng nhập'>
              <span>{userData?.username}</span>
            </Form.Item>

            <Form.Item label='Tên' name='name'>
              <Input className={styles.input} defaultValue={userData?.name} placeholder='Nhập tên của bạn' />
            </Form.Item>

            <Form.Item label='Email'>
              <span>{hiddenEmail(userData?.email)}</span>
              <a href='#' className={styles.textChange}>Thay đổi</a>
            </Form.Item>

            <Form.Item label='Số điện thoại'>
              <span>{hiddenPhone(userData?.phone)}</span>
              <a href='#' className={styles.textChange}>Thay đổi</a>
            </Form.Item>

            <Form.Item label='Giới tính' name='gender'>
              <Radio.Group defaultValue={userData?.gender}>
                <Radio value={1}>Nam</Radio>
                <Radio value={2}>Nữ</Radio>
                <Radio value={0}>Khác</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label='Ngay sinh' name='birthday'>
              <DateComponent date={userData?.birthday} setValueDate={setValueDate} />
            </Form.Item>

            <Button loading={loadingSave} htmlType='submit' className={styles.buttonSave}>Lưu</Button>
          </Col>

          <Col xxl={8} className={styles.containerRight}>
            {url ? <Avatar src={url} size={100} /> : <Avatar icon={<UserOutlined />} size={100} />}
            <Upload onChange={onChangeImage} maxCount={1} showUploadList={false}>
              <Button loading={loading} className={styles.buttonUpload}>Chọn ảnh</Button>
            </Upload>
            <span className={styles.description}>Dung lượng tối đa: 1MB</span>
            <span className={styles.description}>Định dạng: JEPG, PNG</span>
          </Col>
        </Row>
      </Form>
    </div>
  ) : <Spin />
}

export default ProfileScreen;