import { Alert, Modal } from "antd";
import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { BiCheckShield } from 'react-icons/bi'

import ElementCard from "../../../../components/element_card";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE);

const ModalCreateCard = ({ openModal, setOpenModal }) => {
  const handleCancel = () => {
    setOpenModal(false)
  }

  return (
    <Modal title='Thêm thẻ' open={openModal} footer={false} onCancel={handleCancel} closable={false}>
      <Alert
        message='Thông tin thẻ được bảo mật'
        type='success'
        showIcon
        description='Chúng tôi kết hợp cùng Stripe để bảo vệ thông tin của bạn được an toàn và bảo mật tuyệt đối. 
        PT MALL không có quyền truy cập được vào thông tin trên thẻ của bạn'
        icon={<BiCheckShield />}
        style={{ marginBottom: 15 }}
      />
      <Elements stripe={stripePromise}>
        <ElementCard onClickCancel={() => handleCancel()} />
      </Elements>
    </Modal>
  )
}

export default ModalCreateCard;