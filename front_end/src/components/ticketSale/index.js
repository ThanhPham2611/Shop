import React from "react";

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
      <div className={[styles.circleShop]} style={{ top: 0, right: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 6, right: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 12, right: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 18, right: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 24, right: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 0, left: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 6, left: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 12, left: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 18, left: -1.5 }}></div>
      <div className={[styles.circleShop]} style={{ top: 24, left: -1.5 }}></div>
    </div>
  )
};

export const Tags = ({ value }) => {
  return <div className={styles.wrapperTag}>{value}</div>;
};
