import { Button, Col, Drawer, Empty, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { toggleCart } from "../../store/modules/cartSlice";
import { formatCurrency } from "../../utils/function";

import styles from "./cart.module.scss";
import InputAmount from "../input_plus_min";

const Cart = () => {
  const { isOpen, product } = useSelector((state) => state.cartInfo);

  const dispatch = useDispatch();

  const amountRef = useRef();
  const [arrayCart, setArrayCart] = useState([]);

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      const existProduct = arrayCart.find(
        (filter) => filter._id === product._id
      );
      if (existProduct) {
        const updateArrayCart = arrayCart.map((item) => {
          if (item._id === product._id) {
            if (item.amount + product.amount < 10) {
              amountRef.current.setValueItem(item.amount + product.amount);
              return { ...item, amount: item.amount + product.amount };
            }
          }
          return item;
        });
        setArrayCart(updateArrayCart);
      } else {
        setArrayCart([...arrayCart, product]);
      }
    }
  }, [product]);

  const onClose = () => dispatch(toggleCart(false));

  const handleTotal = (value) => {
    const existProduct = arrayCart.find((filter) => filter._id === product._id);
    if (existProduct) {
      const updateArrayCart = arrayCart.map((item) => {
        if (item._id === product._id) {
          amountRef.current.setValueItem(value);
          return { ...item, amount: value };
        }
        return item;
      });
      setArrayCart(updateArrayCart);
    }
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
      style={{ position: "relative" }}
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
              <Col span={3}>
                <img
                  className={styles.imgCart}
                  src={items.image}
                  alt={items.image}
                />
              </Col>
              <Col span={19} className={styles.textCart}>
                <span className={styles.textTitleItem}>{items.title}</span>
                <Row align="middle" justify="space-between">
                  <div className={styles.buttonCart}>
                    <InputAmount
                      ref={amountRef}
                      handleTotal={(value) => handleTotal(value)}
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
