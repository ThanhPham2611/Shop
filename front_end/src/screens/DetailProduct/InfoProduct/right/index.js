import React from "react";
import { TicketDiscount } from "../../../../components/ticketSale";

import styles from './rightInfo.module.scss';

const RightInfoProduct = () => {
  return (
    <div className={styles.container}>
      <TicketDiscount />
      <TicketDiscount />
      <TicketDiscount />
      <TicketDiscount />
    </div>
  )
}

export default RightInfoProduct;