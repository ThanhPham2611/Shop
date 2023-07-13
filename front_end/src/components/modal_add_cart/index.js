import { Modal, Row } from "antd";
import React, { useEffect } from "react";

import { BsCheck2Circle } from 'react-icons/bs';

import styles from './modal_add.module.scss';

const ModalAddCart = ({ isOpen, setIsOpen }) => {
  const handleCancel = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false)
    }, 5000)
  }, [isOpen])

  return (
    <Modal open={isOpen} footer={false} centered closable={false} onCancel={handleCancel}>
      <Row justify='center' align='middle' className={styles.rowModal}>
        <BsCheck2Circle style={{ color: '#4bb543', fontSize: 40 }} />
        <div>Sản phẩm đã được thêm vào giỏ hàng</div>
      </Row>
    </Modal>
  )
}

export default ModalAddCart;