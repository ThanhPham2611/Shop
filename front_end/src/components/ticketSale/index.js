import React from "react";
import { Button, Row } from 'antd';

import { ButtonFirst } from "../button";

import {
  ClockCircleOutlined
} from '@ant-design/icons';

import styles from "./ticket.module.scss";

export const Coupons = ({ number }) => {
  return (
    <div className={styles.wrapperCoupons}>
      <span className={styles.textCoupons}>{number}% Giảm</span>
      <div className={[styles.circle]} style={{ top: 0, right: -1.5 }}></div>
      <div className={[styles.circle]} style={{ top: 4, right: -1.5 }}></div>
      <div className={[styles.circle]} style={{ top: 8, right: -1.5 }}></div>
      <div className={[styles.circle]} style={{ top: 12, right: -1.5 }}></div>
      <div className={[styles.circle]} style={{ top: 16, right: -1.5 }}></div>
      <div className={[styles.circle]} style={{ top: 0, left: -1.5 }}></div>
      <div className={[styles.circle]} style={{ top: 4, left: -1.5 }}></div>
      <div className={[styles.circle]} style={{ top: 8, left: -1.5 }}></div>
      <div className={[styles.circle]} style={{ top: 12, left: -1.5 }}></div>
      <div className={[styles.circle]} style={{ top: 16, left: -1.5 }}></div>
    </div>
  );
};

export const CoupounsShop = ({ number }) => {
  return (
    <div className={styles.wrapperCouponsShop}>
      <span className={styles.textCouponsShop}>{number}% Giảm</span>
      <div className={[styles.circleShop]} style={{ top: 6, right: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 12, right: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 18, right: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 6, left: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 12, left: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 18, left: -1.5 }}></div>
    </div>
  )
};

export const TicketDiscount = ({ discount, minimum, maximum, expiresDate, startTime }) => {
  return (
    <Row className={styles.wrapperTicketDiscount} justify='space-between'>
      <div className={styles.wrapperLeft}>
        <div className={styles.textDiscount}>Giảm 10K</div>
        <div className={styles.textMinimum}>Đơn tối thiểu 0Đ</div>
        <div className={styles.textMinimum}>Giảm tối đa 100K</div>

        <div className={styles.wrapperDate}>
          <ClockCircleOutlined className={styles.textDate} style={{ marginRight: 5 }} />
          <span className={styles.textDate}>Có hiệu lực sau: 4 giờ</span>
        </div>
      </div>
      <div className={styles.wrapperButton}>
        <ButtonFirst className={styles.buttonSave} title='Lưu' />
      </div>
    </Row>
  )
}

export const Tags = ({ value }) => {
  return <div className={styles.wrapperTag}>{value}</div>;
};

export const TagDeal = ({ title }) => {
  return <div className={styles.tagDeal}>{title}</div>
}
