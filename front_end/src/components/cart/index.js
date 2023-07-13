import { Button, Col, Drawer, Empty, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  CloseCircleOutlined
} from '@ant-design/icons';

import { toggleCart } from "../../store/modules/cartSlice";
import { debounce, formatCurrency } from "../../utils/function";

import styles from "./cart.module.scss";
import InputAmount from "../input_plus_min";
import { get, post } from "../../service/axios/instance";

const Cart = () => {
  const { isOpen, product } = useSelector((state) => state.cartInfo);

  const dispatch = useDispatch();

  const amountRef = useRef();
  const [arrayCart, setArrayCart] = useState([]);

  useEffect(() => {
    (async () => {
      await get('cart')
        .then(data => {
          const { cartInfo } = data;
          console.log(cartInfo);
          setArrayCart(cartInfo);
        })
        .catch(err => {
          console.log(err);
        })
    })()
  }, [])

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      const existProduct = arrayCart.find(
        (filter) => filter.productId === product.productId
      );
      if (existProduct) {
        const updateArrayCart = arrayCart.map((item) => {
          if (item.productId === product.productId) {
            if (item.amount + product.amount < 10) {
              amountRef.current.setValueItem(item.amount + product.amount);
              post('update_cart', {
                shopId: item.shopId,
                productId: item.productId,
                amount: item.amount + product.amount
              })
              return { ...item, amount: item.amount + product.amount };
            }
          }
          return item;
        });
        setArrayCart(updateArrayCart);
      } else {
        setArrayCart([...arrayCart, product]);
        const { _id, ...data } = product;
        post('add_cart', {
          ...data
        })
      }
    }
  }, [product]);

  const onClose = () => dispatch(toggleCart(false));

  const handleDeleteItem = (item) => {
    const newArrayCart = arrayCart.filter(filter => filter.productId !== item.productId);
    setArrayCart(newArrayCart);
  }

  const handleTotal = (value, item) => {
    const existProduct = arrayCart.find((filter) => filter.productId === item.productId);
    if (existProduct) {
      const updateArrayCart = arrayCart.map((map) => {
        if (map.productId === item.productId) {
          amountRef.current.setValueItem(value);
          return { ...item, amount: value };
        }
        return item;
      });
      setArrayCart(updateArrayCart);
    }
    const callDebounce = debounce(() => {
      return post('update_cart', {
        shopId: item.shopId,
        productId: item.productId,
        amount: value
      })
    }, 2000);
    callDebounce();
  };

  const total = arrayCart.reduce((acc, item) => {
    const itemTotal =
      item.amount * (item.price - (item.price * item.salePercent) / 100);
    return acc + itemTotal;
  }, 0);

  const handlePayment = async () => {
    await axios.post(`${process.env.REACT_APP_API_CHECKOUT}/create-checkout-session`, {
      cartItems: arrayCart,
    })
      .then((data) => {
        window.location.href = `${data.data.url}`
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Drawer
      title="Giỏ hàng"
      onClose={onClose}
      open={isOpen}
      placement="right"
      closable={true}
      key="right"
      extra={
        <Button>Chi tiết đơn hàng</Button>
      }
      mask={false}
      width={450}
    >
      {arrayCart.length > 0 ? (
        <div>
          {arrayCart?.map((items) => (
            <Row
              key={items._id}
              align="middle"
              justify="space-between"
              className={styles.wraperItem}
            >
              <Col span={1}>
                <CloseCircleOutlined style={{ color: 'red' }} onClick={() => handleDeleteItem(items)} />
              </Col>
              <Col span={5}>
                <img
                  className={styles.imgCart}
                  src={items.image}
                  alt={items.image}
                />
              </Col>
              <Col span={16} className={styles.textCart}>
                <span className={styles.textTitleItem}>{items.title}</span>
                <Row align="middle" justify="space-between">
                  <div className={styles.buttonCart}>
                    <InputAmount
                      ref={amountRef}
                      handleTotal={(value) => handleTotal(value, items)}
                      cart={true}
                      value={items.amount}
                    />
                  </div>
                  <span className={styles.priceCart}>
                    {items.salePercent
                      ? formatCurrency(
                        items.amount *
                        (items.price -
                          (items.price * items.salePercent) / 100)
                      )
                      : formatCurrency(items.amount * items.price)}
                  </span>
                </Row>
              </Col>
            </Row>
          ))}
          <div className={styles.buttonPaymentContainer}>
            <span className={styles.priceTotal}>
              Tổng tiền: {formatCurrency(total)}
            </span>
            <Button
              onClick={handlePayment}
              className={styles.buttonPaymentCart}
              type="primary"
              danger
            >
              Thanh toán
            </Button>
          </div>
        </div>
      ) : (
        <Empty description="Giỏ hàng trống" />
      )}
    </Drawer>
  );
};

export default Cart;
