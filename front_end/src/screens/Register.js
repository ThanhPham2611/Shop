import React from "react";
import { Button, Col, Divider, Form, Input, Row, notification } from "antd";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import logo from '../asset/image/logo_login.png';

import { post } from "../service/axios/instance";
import { getUsername } from "../store/modules/verifySlice";

import styles from "../asset/scss/login.module.scss";

const Register = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleRegister = (value) => {
    post('register', {
      ...value,
      username: value.username.toLowerCase(),
      role: 1
    })
      .then(data => {
        dispatch(getUsername(value.username.toLowerCase()))
        history.push(`/verify_register`)
      })
      .catch(err => {
        if (err.response.status === 409) {
          notification.error({ message: 'Tên đăng nhập đã được sử dụng' })
        }
      })
  };

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
            <span className={styles.title}>Đăng ký</span>
          </Row>
          <Divider />
          <Form form={form} layout="vertical" onFinish={handleRegister}>
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

            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Bạn cần điền trường này",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu không trùng khớp")
                    );
                  },
                }),
              ]}
              dependencies={["password"]}
            >
              <Input.Password
                className={styles.input}
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>

            <Form.Item name='phone' rules={[
              {
                required: true,
                message: 'Bạn cần điền trường này'
              }
            ]}>
              <Input className={styles.input} placeholder='Nhập số điện thoại' />
            </Form.Item>

            <Button
              className={styles.btn}
              type="primary"
              danger
              htmlType="submit"
            >
              Đăng ký
            </Button>

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
                Bạn đã có tài khoản, <a href="/login">Đăng nhập</a>
              </span>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
