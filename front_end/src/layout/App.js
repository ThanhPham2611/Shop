import React, { useEffect } from "react";
import { Avatar, Badge, Col, Divider, Dropdown, Image, Input, Row, Space } from "antd";
import {
  ShoppingCartOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Cart from "../components/cart";
import { toggleCart } from "../store/modules/cartSlice";

//local
import logo from "../asset/image/logo.png";

import styles from "./app.module.scss";
import { STORAGEKEY, getCookie, removeCookie } from "../service/cookie";

const { Search } = Input;


const App = (props) => {

  const handleLogout = async () => {
    removeCookie(STORAGEKEY.ACCESS_TOKEN);
  }
  const items = [
    {
      key: 'info',
      label: (
        <a href='#'>Tài khoản của tôi</a>
      )
    },
    {
      key: 'order',
      label: (
        <a href='#'>Đơn mua</a>
      )
    },
    {
      key: 'logout',
      label: (
        <a href='/login' onClick={handleLogout}>Đăng xuất</a>
      )
    }
  ]
  //components render
  const { renderRouter } = props;
  const getToken = getCookie(STORAGEKEY.ACCESS_TOKEN);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const whiteList = ['/login', '/register', '/verify_register'];

  const avatarDiv = (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size={26} icon={<UserOutlined />} />
          <span className={styles.username}>Thanhptttt</span>
        </Space>
      </a>
    </Dropdown>
  )

  const onSearch = (value) => {
    console.log(value);
  };

  return (whiteList.includes(pathname)) ? (
    <div>
      {renderRouter()}
      <ToastContainer />
    </div>
  ) : (
    <div id={styles.main}>
      <div className={styles.wrapperHeader}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space size={5}>
              <a>Trang chủ</a>
              <Divider
                type="vertical"
                style={{ borderColor: "hsla(0,0%,100%,.22)" }}
              />
              <a>Trở thành người bán</a>
              <Divider
                type="vertical"
                style={{ borderColor: "hsla(0,0%,100%,.22)" }}
              />
              <a>Tải ứng dụng</a>
              <Divider
                type="vertical"
                style={{ borderColor: "hsla(0,0%,100%,.22)" }}
              />
              <a>Kết nối</a>
            </Space>
          </Col>
          <Col>
            <Space size={18}>
              <Space>
                <a>Thông báo</a>
                <BellOutlined style={{ color: "white" }} />
              </Space>
              <Space>
                <a>Hỗ trợ</a>
                <QuestionCircleOutlined style={{ color: "white" }} />
              </Space>
              {getToken ? avatarDiv : <Space>
                <a href='/register'>Đăng ký</a>
                <a href="/login">Đăng nhập</a>
              </Space>}
            </Space>
          </Col>
        </Row>

        <Row
          justify="space-between"
          align="middle"
          className={styles.searchBarContainer}
        >
          <Col className={styles.wrapperLogo}>
            <Image
              src={logo}
              alt="Logo"
              preview={false}
              className={styles.logo}
            />
          </Col>

          <Col className={[styles.searchBar, "search"]}>
            <Search
              placeholder="Tìm kiếm"
              onSearch={onSearch}
              allowClear
              className={styles.inputSearch}
              enterButton="Tìm kiếm"
              size="large"
            />
            <Badge count={5}>
              <ShoppingCartOutlined className={styles.iconShoppingCart} onClick={() => dispatch(toggleCart(true))} />
            </Badge>
          </Col>
        </Row>
      </div>
      <Cart />
      <div className={styles.wrapperContent}>{renderRouter()}</div>
      <ToastContainer />
    </div>
  );
};

export default App;
