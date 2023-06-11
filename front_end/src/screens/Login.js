import React from "react";
import { Button, Col, Divider, Form, Input, Row } from "antd";

import { FaFacebookSquare, FaGoogle } from "react-icons/fa";

import styles from "../asset/scss/login.module.scss";

const Login = () => {
  const [form] = Form.useForm();

  const handleLogin = (value) => {
    console.log(value);
  };

  return (
    <div>
      <div className={styles.bg}>
        <div className={styles.form_container}>
          <h1>Đăng nhập</h1>
          <Divider />
          <Form form={form} layout="vertical" onFinish={handleLogin}>
            <Form.Item
              name="usename"
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
