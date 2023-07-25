import React from "react";
import { Col, Row, Space } from "antd";

import logo from '../../asset/image/logo_login.png'

import styles from './header.module.scss';

const HeaderComponent = ({ titleHeader }) => {
  return (
    <div className={styles.wrapperHeader}>
      <Row justify='space-between' align='middle' className={styles.contentHeader}>
        <Col>
          <Space size={25}>
            <img src={logo} alt='logo' className={styles.logo} />
            <p className={styles.titleHeader}>{titleHeader || ''}</p>
          </Space>
        </Col>

        <Col>
          <a>Bạn cần giúp đỡ ?</a>
        </Col>
      </Row>
    </div>
  )
}

export default HeaderComponent;