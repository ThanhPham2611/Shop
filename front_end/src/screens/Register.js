import React from "react";
import { Button, Col, Divider, Form, Input, Row } from "antd";

import { FaFacebookSquare, FaGoogle } from "react-icons/fa";

import styles from "../asset/scss/login.module.scss";

const Register = () => {
  const [form] = Form.useForm();

  const handleLogin = (value) => {
    console.log(value);
  };

  return (
    <div>
      <div className={styles.bg}>
        <div className={styles.form_container}>
          <h1>Đăng ký</h1>
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

            <Form.Item
              name="rePassword"
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
