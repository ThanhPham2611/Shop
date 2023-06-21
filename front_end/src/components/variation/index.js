import React, { useState } from "react";
import { Row } from "antd";
import { useDispatch } from 'react-redux';

import styles from './variation.module.scss';
import { getSelect } from "../../store/modules/cartSlice";

const Variation = ({ data }) => {
  const [highlight, setHighlight] = useState();
  const dispatch = useDispatch();

  const handleClick = (item, index) => {
    if (highlight !== index) {
      setHighlight(index);
      dispatch(getSelect(item));
    }
  }

  return (
    <Row>
      {data?.map((items, index) => (
        <div
          key={index}
          className={styles.wrapper}
          style={highlight === index ? { border: '1px solid #d0011b', color: '#d0011b' } : {}}
          onClick={() => handleClick(items, index)}
        >
          {items.title}
        </div>
      ))}
    </Row>
  )
}

export default Variation