import { Row } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import styles from "./input_amount.module.scss";

const InputAmount = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value || 1);

  useImperativeHandle(ref, () => ({
    getValue() {
      return value;
    },
    setValueItem(amount) {
      if (amount < 10) {
        setValue(amount);
      }
    },
  }));

  const handleInc = () => {
    if (value < 9) {
      setValue(value + 1);
      if (props.cart) {
        props?.handleTotal(value + 1);
      }
    }
  };

  const handleDec = () => {
    if (value > 1) {
      setValue(value - 1);
      if (props.cart) {
        props?.handleTotal(value - 1);
      }
    }
  };

  return (
    <Row>
      <button className={styles.button} onClick={handleDec}>
        <MinusOutlined />
      </button>
      <input value={value} className={styles.input} />
      <button className={styles.button} onClick={handleInc}>
        <PlusOutlined />
      </button>
    </Row>
  );
});

export default InputAmount;
