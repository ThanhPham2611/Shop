import { Button, Col, Drawer, Empty, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from 'react-redux'

import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

import { toggleCart } from "../../store/modules/cartSlice";
import { formatCurrency } from "../../utils/function";

import styles from './cart.module.scss'

const Cart = () => {
  const { isOpen } = useSelector(state => state.cartInfo)

  const dispatch = useDispatch();

  const onClose = () => dispatch(toggleCart(false))


  return (
    <Drawer title='Giỏ hàng' onClose={onClose} open={isOpen} placement='right' closable={true} key='right' style={{ position: 'relative' }}>
      {/* <Empty description='Giỏ hàng trống' /> */}
      <Row align='middle' justify='space-between' className={styles.wraperItem}>
        <Col span={3}>
          <img className={styles.imgCart} src='https://down-vn.img.susercontent.com/file/7cce71c953e8835cacfd66adca00dd10_tn' alt='sua tam' />
        </Col>
        <Col span={19} className={styles.textCart}>
          <span className={styles.textTitleItem}>Sữa tắm trắng da Enchanteur hương nước hoa</span>
          <Row align='middle' justify='space-between'>
            <div className={styles.buttonCart}>
              <Button icon={<MinusOutlined />} size='small' />
              <span className={styles.numberItem}>1</span>
              <Button icon={<PlusOutlined />} size='small' />
            </div>
            <span className={styles.priceCart}>{formatCurrency(100000)}</span>
          </Row>
        </Col>
      </Row>

      <div className={styles.buttonPaymentContainer}>
        <span className={styles.priceTotal}>Tổng tiền: {formatCurrency(100000)}</span>
        <Button className={styles.buttonPaymentCart} type='primary' danger>Thanh toán</Button>
      </div>
    </Drawer>
  )
}

export default Cart