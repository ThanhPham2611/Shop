import React from "react";
import { Avatar, Col, Row, Space } from "antd";

import logoMall from '../../../asset/image/logo_shoppe_mall.png';
import { BsChatRightDotsFill, BsShop } from 'react-icons/bs'

import styles from './infoshop.module.scss';
import { ButtonFirst, ButtonSecond } from "../../../components/button";

const InfoShop = () => {
  return (
    <Row className={styles.wrapperInfoShop} align='middle'>
      <Col className={styles.colAvatar}>
        <Avatar size={80} src={'https://down-vn.img.susercontent.com/file/a0851f141ffc6a234a275925eb185266_tn'} style={{ border: '1px solid #ccc' }} />
        <img src={logoMall} className={styles.logoMall} />
      </Col>
      <Col className={styles.colAction}>
        <h3>unilevervn_beauty</h3>
        <h5 className={styles.textActive}>Online 4 Giờ Trước</h5>
        <Space className={styles.wrapperButton}>
          <ButtonSecond icon={<BsChatRightDotsFill size={13} style={{ marginRight: 10 }} />} title={'Chat ngay'} className={styles.buttonChat} />
          <button className={styles.buttonViewShop}>
            <BsShop size={15} style={{ marginRight: 10 }} />
            Xem shop
          </button>
        </Space>
      </Col>
      <Col xxl={3} className={styles.colDescription}>
        <Row className={styles.wrapperDescription} justify='space-between'>
          <span className={styles.label}>Đánh giá</span>
          <span className={styles.value}>2,1tr</span>
        </Row>
        <Row className={styles.wrapperDescription} justify='space-between'>
          <span className={styles.label}>Sản phẩm</span>
          <span className={styles.value}>740</span>
        </Row>
      </Col>
    </Row>
  )
}

export default InfoShop