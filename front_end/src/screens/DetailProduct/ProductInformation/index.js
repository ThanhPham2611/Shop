import React from "react";
import { useParams } from "react-router-dom";
import { Col, Image, Rate, Row, Typography } from "antd";
import ReactPlayer from 'react-player'

import styles from './information.module.scss';
import { detailProduct } from "../../../utils/dummyData";
import { formatAmoutProductSold, formatCurrency } from "../../../utils/function";

const { Text } = Typography

const ProductInformation = () => {
  // const { id } = useParams()

  return (
    <Row className={styles.wrapperInformation}>
      <Col xxl={9}>
        {
          detailProduct.listImage[0].type === 'vid' ?
            <ReactPlayer url={detailProduct.listImage[0].url} height={500} width={500} playing={true} volume={0} /> :
            <Image url={detailProduct.listImage[0].url} height={400} />
        }
        <div style={{ height: 100 }}>
          {
            detailProduct.listImage.map(dataImage => {
              dataImage.type === 'vid' ? (
                <div>
                  <Image src={dataImage.urlImagePreview} height={100} />
                </div>
              ) : (
                <Image src={dataImage.url} height={100} />
              )
            }
            )
          }
        </div>
      </Col>
      <Col xxl={15}>
        <span className={styles.titleProduct}>{detailProduct.titleProduct}</span>
        <Row className={styles.infoSaleProduct} justify='space-between' align='middle'>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.wrapperRate}>
              <span className={styles.spanRate}>{detailProduct.rate}</span>
              <Rate disabled allowHalf defaultValue={detailProduct.rate} style={{ color: '#d0011b', fontSize: 15 }} />
            </div>
            <div className={styles.wrapperEvalute}>
              <span className={styles.valueEvalute}>{formatAmoutProductSold(detailProduct.evaluate)}</span>
              <span className={styles.spanEvalute}>Đánh giá</span>
            </div>
            <div className={styles.wrapperEvalute} style={{ border: 'none' }}>
              <span className={styles.valueEvalute}>{formatAmoutProductSold(detailProduct.sold)}</span>
              <span className={styles.spanEvalute}>Đã bán</span>
            </div>
          </Col>
          <Col>
            <span className={styles.spanReport}>Tố cáo</span>
          </Col>
        </Row>
        {detailProduct.showSale && (
          <Row className={styles.wrapperPrice} align='middle'>
            <Text className={styles.textPriceOld} delete>{formatCurrency(detailProduct.priceOld)}</Text>
            <Text className={styles.textPriceNew}>{formatCurrency(detailProduct.priceNew)}</Text>
            <div className={styles.showSale}>{(detailProduct.priceNew / detailProduct.priceOld) * 100}% giảm</div>
          </Row>
        )}

      </Col>
    </Row>
  )
}

export default ProductInformation