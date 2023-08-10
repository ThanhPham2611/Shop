import { Avatar, Divider, Menu, Row } from "antd";
import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { useLocation, useHistory } from 'react-router-dom';

import { getItem } from "../../utils/function";

import styles from './menu.module.scss';

const items = [
  getItem('Tài khoản của tôi', '/user/account', <UserOutlined />, [
    getItem('Hồ sơ', '/user/account/profile'),
    getItem('Ngân hàng', '/user/account/payment'),
    getItem('Địa chỉ', '/user/account/address'),
    getItem('Đổi mật khẩu', '/user/account/change_password'),
  ])
]

const MenuSettingComponent = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const onClick = (e) => {
    push(e.key)
  }

  return (
    <div>
      <Row align='middle' justify='space-between' className={styles.wrapperHeaderName}>
        <Avatar size={50} icon={<UserOutlined />} />
        <span className={styles.name}>Thanhpttt</span>
      </Row>
      <Divider />
      <Menu
        onClick={onClick}
        mode='inline'
        items={items}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={['/user/account']}
      />
    </div>
  )
}

export default MenuSettingComponent;