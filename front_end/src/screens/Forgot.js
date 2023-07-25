import React, { useState } from "react";
import { Button, Form, Input, Spin, notification } from "antd";

import { AiOutlineArrowLeft } from 'react-icons/ai'

import HeaderComponent from "../components/header";
import FooterComponent from "../components/footer";
import { post } from '../service/axios/instance';

import styles from '../asset/scss/forgot.module.scss';
import VerificationInput from "react-verification-input";
import { STORAGEKEY, setCookie } from "../service/cookie";
import { regexEmail } from "../utils/regex";

const ForgotScreen = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const [inputCode, setInputCode] = useState(false);
  const [loadingSendCode, setLoadingSendCode] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [valueId, setValueId] = useState('');


  const onFinish = (value) => {
    setLoading(true)
    if (value.email) {
      const newData = {
        ...value,
        type: 0
      }
      post('forgot', newData)
        .then(data => {
          setLoading(false);
          setValueId(data.id);
          setInputCode(true);
          notification.success({ message: 'Mã xác nhận đã được gửi đến email của bạn' });
        })
        .catch(err => {
          setLoading(false);
          setInputCode(false);
          if (err.response.status === 405) {
            notification.error({ message: 'Email không tồn tại, vui lòng kiểm tra lại email' })
          }
        })
    } else {
      const dataChangePass = {
        ...value,
        userId: valueId
      }

      post('change_password', dataChangePass)
        .then(data => {
          setLoading(false);
          notification.success({ message: 'Đổi mật khẩu thành công' });
          setCookie(STORAGEKEY.ACCESS_TOKEN, data.accessToken);
          window.location.href = '/home';
        })
        .catch(err => {
          setLoading(false);
          console.log(err)
        })
    }
  }

  const handleAuthCode = (value) => {
    setLoadingSendCode(true);
    post('verify_code', {
      codeSubmit: value,
      type: 0,
      userId: valueId
    })
      .then(data => {
        setLoadingSendCode(false);
        setNextStep(true);
      })
      .catch(err => {
        setNextStep(false);
      })
  }

  return (
    <div>
      <HeaderComponent titleHeader='Đặt lại mật khẩu' />
      <div className={styles.wrapperPage}>
        {nextStep ? (
          <Form onFinish={onFinish} form={form} className={styles.wrapperForm}>
            <h1 className={styles.title}>Cài đặt mật khẩu mới</h1>
            <Form.Item name='newpassword' rules={[
              {
                required: true,
                message: 'Bạn cần nhập trường này'
              }
            ]}>
              <Input.Password className={styles.input} placeholder='Nhập mật khẩu mới' />
            </Form.Item>

            <Form.Item name='repassword' rules={[
              {
                required: true,
                message: 'Bạn cần nhập trường này'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newpassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không trùng khớp")
                  );
                },
              }),
            ]}>
              <Input.Password className={styles.input} placeholder='Nhập lại mật khẩu' />
            </Form.Item>

            <Button loading={loading} htmlType='submit' className={styles.button}>Xác nhận</Button>
          </Form>
        ) : (
          <Spin spinning={loadingSendCode} tip='Đang xác thực mã code.....'>
            <Form onFinish={onFinish} form={form} className={styles.wrapperForm}>
              <AiOutlineArrowLeft className={styles.iconBack} />
              <h1 className={styles.title}>Đặt lại mật khẩu</h1>
              <Form.Item name='email' rules={[
                {
                  required: true,
                  message: 'Bạn cần điền trường này'
                },
                {
                  pattern: regexEmail,
                  message: 'Không đúng định dạng email'
                }
              ]}>
                <Input placeholder='Nhập email của bạn' className={styles.input} />
              </Form.Item>

              {inputCode && <>
                <h3>Nhập mã code xác thực</h3>
                <VerificationInput onComplete={handleAuthCode} autoFocus classNames={{
                  container: styles.auth_code
                }} />
              </>
              }

              <Button loading={loading} disabled={inputCode} htmlType='submit' className={styles.button}>Tiếp theo</Button>
            </Form>
          </Spin>
        )}
      </div>
      <FooterComponent />
    </div >
  )
}

export default ForgotScreen;