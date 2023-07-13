import React from "react";
import { Row } from "antd";

import styles from './variation.module.scss';


const Variation = ({ data, handleClick, indexClick, err }) => {
  return (
    <div>
      <Row>
        {data?.map((items, index) => (
          <div
            key={index}
            className={styles.wrapper}
            style={indexClick === index ? { border: '1px solid #d0011b', color: '#d0011b' } : {}}
            onClick={() => handleClick(items, index)}
          >
            {items.title}
          </div>
        ))}
      </Row>
      {err && <div className={styles.errText}>Bạn cần chọn những sản phẩm dưới đây</div>}
    </div>
  )
}

export default Variation