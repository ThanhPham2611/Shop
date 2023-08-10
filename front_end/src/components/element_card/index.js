import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Col, Form, Row, Space, Spin, notification } from "antd";
import React, { useState } from "react";

import { post } from '../../service/axios/instance';

import styles from './element_card.module.scss';
import { setCardObj } from "../../store/modules/cardSlice";
import { useDispatch } from "react-redux";

const ElementCard = ({ onClickCancel }) => {
  const [form] = Form.useForm();
  const elements = useElements();
  const stripe = useStripe();
  const dispatch = useDispatch();

  const [loadingCard, setLoadingCard] = useState(false);

  const handleCreateCard = async (value) => {
    if (!elements) {
      return notification.error({ message: 'Bạn cần điền đầy đủ thông tin trên thẻ' })
    }
    setLoadingCard(true);
    const cardElement = elements.getElement(CardNumberElement)

    await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: value.ownerCard
      }
    })
      .then(result => {
        if (result.error) {
          setLoadingCard(false);
          return notification.error({ message: result.error.message });
        }
        const objCard = {
          id: result?.paymentMethod?.id,
          brand: result?.paymentMethod?.card?.brand,
          last4: result?.paymentMethod?.card?.last4,
          default: 1
        }
        dispatch(setCardObj(objCard));
        post('add_card', { objCard })
          .then(() => {
            setLoadingCard(false);
            notification.success({ message: 'Lưu thẻ thành công' });
            onClickCancel();
          });
      })
      .catch(err => {
        notification.error({ message: 'Đã có lỗi xảy ra khi thêm thẻ' })
      })
  }

  const handleCancel = () => {
    onClickCancel();
    form.resetFields();
  }

  return (
    <Spin spinning={loadingCard} tip='Đang tải....'>
      <Form form={form} onFinish={handleCreateCard} layout='vertical'>
        <Form.Item label='Number card' name='card'>
          <CardNumberElement options={{ showIcon: true, iconStyle: "solid" }} key='numberCard' className={styles.borderInputForm} id='cardNumber' />
        </Form.Item>
        <Row justify='space-between' align='middle'>
          <Col xxl={12}>
            <Form.Item label='Epires' name='expires'>
              <CardExpiryElement key='expiresCard' className={styles.borderInputForm} />
            </Form.Item>
          </Col>
          <Col xxl={9}>
            <Form.Item label='CVV code' name='cvv' >
              <CardCvcElement key='cvvCard' className={styles.borderInputForm} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label='Họ và tên' name='ownerCard' rules={[{
          required: true,
          message: 'Bạn cần nhập trường này'
        }]}>
          <input className={styles.inputName} placeholder='Nhập họ và tên không dấu' />
        </Form.Item>
        <Space className={styles.groupBtn}>
          <button className='button back' onClick={handleCancel}>Trở lại</button>
          <button className='button shopee' htmlType='submit'>Xác nhận</button>
        </Space>
      </Form>
    </Spin>
  )
}

export default ElementCard;