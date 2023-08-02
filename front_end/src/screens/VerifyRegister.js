import React, { useState } from "react";
import { Button, Divider, Input, Row, notification } from "antd";
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import VerificationInput from "react-verification-input";

import { post } from '../service/axios/instance'

import logo from '../asset/image/logo_login.png'
import { STORAGEKEY, setCookie } from "../service/cookie";

import styles from '../asset/scss/verify.module.scss';

const { Search } = Input

const VerifyRegister = () => {
  const history = useHistory();
  const { username } = useSelector(state => state.verifyInfo)

  const [loading, setLoading] = useState(false);
  const [loadingSendCode, setLoadingSendCode] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [valueEmail, setValueEmail] = useState('')

  const handleVerify = (value) => {
    setValueEmail(value)
    setLoading(true)
    post('verify_email', {
      email: value,
      username: username,
      type: 1
    })
      .then(data => {
        setLoading(false);
        setDisabled(true);
        setNextStep(true);
        notification.success({ message: 'Đã gửi thành công mã code đến email của bạn' })
      })
      .catch(err => {
        setLoading(false);
        if (err.response.status === 409) {
          notification.error({ message: 'Email đã được sử dụng' })
        }
      })
  }

  const handleAuthCode = (value) => {
    setLoadingSendCode(true);
    post('verify_code', {
      username: username,
      email: valueEmail,
      codeSubmit: value
    })
      .then(data => {
        setLoadingSendCode(false);
        setCookie(STORAGEKEY.ACCESS_TOKEN, data.accessToken)
        window.location.href = '/home'
      })
      .catch(err => {
        setLoadingSendCode(false);
        if (err.response.status === 401) {
          notification.error({ message: 'Mã code không đúng hoặc đã sử dụng' })
        } else if (err.response.status === 405) {
          notification.err({ message: 'Mã code đã hết hạn' })
        }
      })
  }

  return (
    <div>
      <div className={styles.bg}>
        <div className={styles.formVerify}>
          <Row align='middle' justify='space-between'>
            <img
              src={logo}
              className={styles.logo}
              onClick={() => history.push('/')}
            />
            <span className={styles.title}>Xác thực người dùng</span>
          </Row>
          <Divider />
          <Search
            placeholder='Nhập địa chỉ email của bạn'
            enterButton='Gửi email'
            size='large'
            onSearch={handleVerify}
            disabled={disabled}
            loading={loading}
          />
          {nextStep && <div className={styles.wrapper_auth_code}>
            <h3>Nhập mã code xác thực</h3>
            <VerificationInput onComplete={handleAuthCode} classNames={{
              container: styles.auth_code
            }} />
            <Button loading={loadingSendCode} type='primary' danger className={styles.button_auth_code}>Gửi mã code</Button>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default VerifyRegister