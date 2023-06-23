import { Col, Row } from "antd";
import React from "react";
import LeftInfoProduct from "./left";
import RightInfoProduct from "./right";

const InfoProduct = () => {
  return (
    <Row justify='space-between'>
      <Col xxl={18}>
        <LeftInfoProduct />
      </Col>

      <Col xxl={5}>
        <RightInfoProduct />
      </Col>
    </Row>
  )
}

export default InfoProduct;