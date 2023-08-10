import { Col, Row } from "antd";
import React from "react";
import { useLocation } from 'react-router-dom';

import MenuSettingComponent from "../../components/menu_setting";
import ProfileScreen from "./Profile";

import styles from '../../asset/scss/my_account.module.scss';
import PaymentScreen from "./Payment";

const LayoutMyAccout = () => {
  const { pathname } = useLocation()


  return (
    <Row justify='space-between'>
      <Col xxl={4}>
        <MenuSettingComponent />
      </Col>
      <Col xxl={19} className={styles.wrapper}>
        {pathname === '/user/account/profile' && <ProfileScreen />}
        {pathname === '/user/account/payment' && <PaymentScreen />}
      </Col>
    </Row>
  )
}

export default LayoutMyAccout;