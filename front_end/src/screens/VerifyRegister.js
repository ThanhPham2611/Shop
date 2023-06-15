import React from "react";
import { Button, Divider, Form, Input, Row, Space } from "antd";
import { useHistory } from 'react-router-dom'

import logo from '../asset/image/logo_login.png'

import styles from '../asset/scss/verify.module.scss';

const { Search } = Input

const VerifyRegister = () => {
  const history = useHistory();

  const handleVerify = (value) => {
    console.log(value)
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
            enterButton='Xác thực'
            size='large'
            onSearch={handleVerify}
          />
        </div>
      </div>
    </div>
  )
}

export default VerifyRegister