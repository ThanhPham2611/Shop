import React from "react";
import { Row } from "antd";

import styles from './variation.module.scss';


const Variation = ({ data, handleClick, indexClick }) => {
  return (
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
  )
}

export default Variation