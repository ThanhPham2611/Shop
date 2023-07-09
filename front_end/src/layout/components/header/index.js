import {
  Avatar,
  Badge,
  Col,
  Divider,
  Dropdown,
  Image,
  Input,
  Row,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ShoppingCartOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

//local
import logo from "../../../asset/image/logo.png";

import { STORAGEKEY, getCookie, removeCookie } from "../../../service/cookie";
import { toggleCart } from "../../../store/modules/cartSlice";

import styles from "../../app.module.scss";
import { checkLogin } from "../../../utils/function";

const { Search } = Input;

const Header = () => {
  const { userData } = useSelector((state) => state.userInfo);
  const { product } = useSelector((state) => state.cartInfo);

  const getToken = getCookie(STORAGEKEY.ACCESS_TOKEN);
  const dispatch = useDispatch();

  const [arrayCart, setArrayCart] = useState([]);

  const handleLogout = () => {
    return removeCookie(STORAGEKEY.ACCESS_TOKEN);
  };

  useEffect(() => {
    // if (Object.keys(product).length !== 0) {
    //   const existProduct = arrayCart.find(
    //     (filter) => filter._id === product._id
    //   );
    //   if (existProduct) {
    //     const updateArrayCart = arrayCart.map((item) => {
    //       if (item._id === product._id) {
    //         return { ...item, amount: item.amount + product.amount };
    //       }
    //       return item;
    //     });
    //     setArrayCart(updateArrayCart);
    //   } else {
    //     setArrayCart([...arrayCart, product]);
    //   }
    // }
  }, [product]);

  const items = [
    {
      key: "info",
      label: <a href="#">Tài khoản của tôi</a>,
    },
    {
      key: "order",
      label: <a href="#">Đơn mua</a>,
    },
    {
      key: "logout",
      label: (
        <a href="/login" onClick={handleLogout}>
          Đăng xuất
        </a>
      ),
    },
  ];

  const avatarDiv = (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size={26} icon={<UserOutlined />} />
          <span className={styles.username}>{userData.username}</span>
        </Space>
      </a>
    </Dropdown>
  );

  const onSearch = (value) => {
    console.log(value);
  };

  const handleToggleCart = () => {
    if (checkLogin()) {
      dispatch(toggleCart(true));
    }
  };

  return (
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
            {getToken ? (
              avatarDiv
            ) : (
              <Space>
                <a href="/register">Đăng ký</a>
                <a href="/login">Đăng nhập</a>
              </Space>
            )}
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
          <Badge count={arrayCart.length}>
            <ShoppingCartOutlined
              className={styles.iconShoppingCart}
              onClick={handleToggleCart}
            />
          </Badge>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
