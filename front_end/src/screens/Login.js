import React from "react";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'

import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import logo from '../asset/image/logo_login.png';

import { post } from '../service/axios/instance'
import { STORAGEKEY, setCookie } from "../service/cookie";

import styles from "../asset/scss/login.module.scss";

// import axios from "axios";

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const handleLogin = async (value) =>
    post('login', {
      ...value,
      username: value.username.toLowerCase()
    })
      .then(data => {
        const { accessToken } = data;
        setCookie(STORAGEKEY.ACCESS_TOKEN, accessToken);
        toast.success('Đăng nhập thành công');
        window.location.href = '/home'
      })
      .catch(err => {
        console.log('err', err)
        if (err.response.status === 404) {
          toast.error('Không tìm thấy tài khoản')
        } else if (err.response.status === 402) {
          toast.error('Tài khoản hoặc mật khẩu không đúng')
        } else if (err.response.status === 401) {
          toast.error('Tài khoản của bạn chưa được kích hoạt')
          history.push('/verify_register')
        }
      })

  return (
    <div>
      <div className={styles.bg}>
        <div className={styles.form_container}>
          <Row align='middle' justify='space-between'>
            <img
              src={logo}
              className={styles.logo}
              onClick={() => history.push('/')}
            />
            <span className={styles.title}>Đăng nhập</span>
          </Row>
          <Divider />
          <Form form={form} layout="vertical" onFinish={handleLogin}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Bạn cần điền trường này",
                },
              ]}
            >
              <Input className={styles.input} placeholder="Tên đăng nhập" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Bạn cần điền trường này",
                },
              ]}
            >
              <Input.Password
                className={styles.input}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <Button
              className={styles.btn}
              type="primary"
              danger
              htmlType="submit"
            >
              Đăng nhập
            </Button>

            <a href="#">Quên mật khẩu</a>

            <Divider plain>Hoặc</Divider>

            <Row justify="space-between" align="middle">
              <Col span={11}>
                <div className={styles.btnBrand}>
                  <FaFacebookSquare />
                  <span>Facebook</span>
                </div>
              </Col>
              <Col span={11}>
                <div className={styles.btnBrand}>
                  <FaGoogle />
                  <span>Google</span>
                </div>
              </Col>
            </Row>

            <Row
              justify="center"
              align="bottom"
              className={styles.linkRegister}
            >
              <span>
                Bạn mới biết đến PT Mall, <a href="/register">Đăng ký</a>
              </span>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
