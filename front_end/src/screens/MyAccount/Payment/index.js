import { Col, Modal, Row, Space, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import { PlusOutlined, DeleteFilled, InfoCircleFilled } from '@ant-design/icons';

import { getImageCard } from "../../../utils/function";
import ModalCreateCard from "./modal/modalCreateCard";

import styles from './payment.module.scss';
import { get, post } from "../../../service/axios/instance";

const { confirm } = Modal

const PaymentScreen = () => {
  const { cardObj } = useSelector(state => state.cardInfo);

  const [listCard, setListCard] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    get('card')
      .then(data => {
        const { cardInfo } = data
        setListCard(cardInfo.listCard);
      })
  }, [])

  useEffect(() => {
    if (Object.keys(cardObj).length > 0) {
      setListCard([...listCard, cardObj]);
    }
  }, [cardObj])

  const showDeleteConfirm = (id, update) => {
    confirm({
      title: update ? 'Bạn có chắc chắn thiết lập lại thẻ mặc định không ?' : 'Bạn có chắc chắn muốn xóa dữ liệu không ?',
      icon: update ? <InfoCircleFilled /> : <DeleteFilled />,
      content: update ? 'Thẻ này sẽ được làm thẻ mặc định khi thanh toán' : 'Thẻ này sẽ bị xóa hoàn toàn khỏi hồ sơ của bạn.',
      okText: 'Chắc chắn',
      okCancel: 'Hủy',
      onOk() {
        if (update) {
          for (const obj of listCard) {
            if (obj.id === id) {
              obj.default = 1;
            } else {
              obj.default = 0;
            }
          }
        } else {
          const updateListCard = listCard.filter(obj => obj.id !== id);
          setListCard(updateListCard);
        }
        post('card/update', {
          idCard: id,
          update: update
        })
          .then(() => {
            window.location.reload();
            return notification.success(update ? { message: 'Cài đặt lại thẻ mặc định thành công' } : { message: 'Xóa thẻ thành công' })
          })
      }
    })
  }

  return (
    <div>
      <Row className={styles.wrapperRow} align='middle' justify='space-between'>
        <h1>Thẻ tín dụng/Ghi nợ</h1>
        <button className={styles.buttonAdd} onClick={() => setOpenModal(true)}>
          <PlusOutlined className={styles.icon} />
          <span>Thêm thẻ mới</span>
        </button>
      </Row>
      {listCard?.map(card => (
        <Row justify='space-between' align='middle' key={card.id} className={styles.wrapperCard}>
          <Col xxl={8}>
            <img className={styles.cardIcon} src={getImageCard(card.brand)} alt={card.brand} />
            <span className={styles.cardName}>{card.brand}</span>
          </Col>
          <Col xxl={11}>
            <Row justify='space-between' align='middle'>
              <Col>
                <span className={styles.cardNumber}>{`**** **** **** ${card.last4}`}</span>
              </Col>
              <Col>
                <Space size={25}>
                  <a href='#' className={styles.buttonDelete} onClick={() => showDeleteConfirm(card.id, false)}>Xóa</a>
                  <button className={styles.buttonDefault} disabled={card.default} onClick={() => showDeleteConfirm(card.id, true)}>
                    <span>Thiết lập mặc định</span>
                  </button>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
      <ModalCreateCard openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default PaymentScreen;