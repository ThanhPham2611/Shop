import { Col, Image, Row } from "antd";
import React from "react";
import { Coupons } from "../../../../components/ticketSale";

import styles from './listBrand.module.scss';

const ListBrand = ({ imageBrand, altImageBrand, categoryProduct }) => {
  return (
    <div className={styles.wrapperProduct}>
      <Image className={styles.imageBrand} src={imageBrand} alt={altImageBrand} />
      <Row gutter={[8, 16]}>
        {categoryProduct?.map(data => (
          <Col key={data.id}>
            <Image src={data.src} alt={data.alt} preview={false} />
            <span>{data.name}</span>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ListBrand