import React from "react";
import { Image, Row } from "antd";
import Countdown from "react-countdown";
import moment from "moment";

import FlashSaleIcon from "../../asset/image/flash_sale_icon.png";
import { OClock } from "../../asset/image/svg/oclock";

import styles from "./flashSale.module.scss";
import { socket } from "../../service/socket";

export const FlashSale = ({ timeEnd, id }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      socket.emit('flashSale', id);
      return (
        <div className={styles.wrapperCountDown}>
          <span className={styles.textCountdown}>0{hours}</span> :
          <span className={styles.textCountdown}>0{minutes}</span> :
          <span className={styles.textCountdown}>0{seconds}</span>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapperCountDown}>
          <span className={styles.textCountdown}>
            {hours < 10 ? `0${hours}` : hours}
          </span>{" "}
          :
          <span className={styles.textCountdown}>
            {minutes < 10 ? `0${minutes}` : minutes}
          </span>{" "}
          :
          <span className={styles.textCountdown}>
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
      );
    }
  };

  return (
    <div className={styles.wrapperFlashSale}>
      <Image
        className={styles.iconFlashSale}
        src={FlashSaleIcon}
        alt="Flash sale"
        preview={false}
      />
      <Row align="middle">
        <OClock />
        <span className={styles.textFlashSale}>Kết thúc trong</span>
        <Countdown
          date={moment(timeEnd).format()}
          renderer={renderer}
          zeroPadTime={2}
        />
      </Row>
    </div>
  );
};
