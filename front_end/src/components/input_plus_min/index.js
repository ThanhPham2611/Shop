import { Row } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from './input_amount.module.scss';

const InputAmount = forwardRef((props, ref) => {
  const [value, setValue] = useState(1);

  useImperativeHandle(ref, () => ({
    getValue() {
      console.log('value::>>', value)
    }
  }))

  const handleInc = () => {
    if (value < 9) {
      setValue(value + 1)
    }
  }

  const handleDec = () => {
    if (value > 1) {
      setValue(value - 1)
    }
  }

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
  )
})

export default InputAmount