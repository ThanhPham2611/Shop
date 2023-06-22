import { Col, Row } from "antd";
import React from "react";

import {
  RightOutlined
} from '@ant-design/icons';

import styles from './leftInfo.module.scss';

const infoDummy = [
  {
    title: 'Danh mục',
    value: ["Shopee", "Sắc đẹp", "Phấn"],
    type: 'category'
  },
  {
    type: 'link',
    title: 'Thương hiệu',
    value: {
      brand: 'Beucoulay',
      id: '1133124'
    }
  },
  {
    title: 'Chăm sóc da',
    value: 'Chống lão hóa, Mụn đầu đen, Se khít lỗ chân lông, Nám/ tàn nhang',
  },
  {
    title: 'Trọng lượng',
    value: '50g'
  },
  {
    title: 'Loại mặt nạ',
    value: 'Mặt nạ bùn'
  },
  {
    title: 'Kho hàng',
    value: 97403
  },
  {
    title: 'Gửi từ',
    value: 'TP.Hồ Chí Minh'
  }
]

const LeftInfoProduct = () => {
  return (
    <div className={styles.container}>
      <h2>Chi tiết sản phẩm</h2>
      <div className={styles.detailProduct}>
        {infoDummy?.map(items => (
          <Row className={styles.wrapperText} align='middle'>
            <Col xxl={3}>
              <span className={styles.label}>{items.title}</span>
            </Col>
            <Col>
              {items.type === 'category' ?
                items?.value?.map((title, index) => (
                  <span><a href='#'>{title}</a>{index < items.value.length - 1 ? <RightOutlined style={{ fontSize: 11, margin: '0 5px' }} /> : ''}</span>
                )) : items.type === 'link' ? (
                  <a href={'#'}>{items.value.brand}</a>
                ) :
                  <span>{items.value}</span>
              }
            </Col>
          </Row>
        ))}
      </div>

      <h2 className={styles.mr30}>Mô tả sản phẩm</h2>
      <div />
    </div>
  )
}

export default LeftInfoProduct;