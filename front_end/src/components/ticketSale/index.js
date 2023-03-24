import React from "react";

import styles from './ticket.module.scss';

export const Coupons = ({ number }) => {
  return (
    <div className={styles.wrapperCoupons}>
      {number}% Giảm
    </div>
  )
}