import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { Col, Image, Rate, Row, Typography } from "antd";
import ReactPlayer from "react-player";

import { detailProduct } from "../../../utils/dummyData";
import {
  formatAmoutProductSold,
  formatCurrency,
  formatSalePercent,
} from "../../../utils/function";

import { FlashSale } from "../../../components/flashSale";
import { CoupounsShop } from "../../../components/ticketSale";
import { FlashShip, Shipping } from "../../../asset/image/svg/iconSvg";
import freeShip from '../../../asset/image/free-shipping.png'

import styles from "./information.module.scss";

const { Text } = Typography;

const ProductInformation = () => {
  // const { id } = useParams()
  const [linkSrc, setLinkSrc] = useState(detailProduct.listImage[1].url);

  const hoverMouse = (e) => {
    setLinkSrc(e.target.src);
  };

  return (
    <Row className={styles.wrapperInformation}>
      <Col xxl={9}>
        {detailProduct.listImage[1].type === "vid" ? (
          <ReactPlayer
            url={detailProduct.listImage[0].url}
            height={500}
            width={500}
            playing={true}
            volume={0}
          />
        ) : (
          <Image src={linkSrc} height={400} />
        )}
        <Row style={{ marginTop: 10 }} align="middle">
          {detailProduct.listImage.map((dataImage) => {
            return dataImage.type === "vid" ? (
              <div key={dataImage.id} className={styles.listImage}>
                <Image
                  onMouseEnter={(e) => hoverMouse(e)}
                  src={dataImage.urlImagePreview}
                  height={100}
                  preview={false}
                />
              </div>
            ) : (
              <div className={styles.listImage}>
                <Image
                  key={dataImage.id}
                  src={dataImage.url}
                  height={100}
                  preview={false}
                  onMouseEnter={(e) => hoverMouse(e)}
                />
              </div>
            );
          })}
        </Row>
      </Col>
      <Col xxl={15}>
        <span className={styles.titleProduct}>
          {detailProduct.titleProduct}
        </span>
        <Row
          className={styles.infoSaleProduct}
          justify="space-between"
          align="middle"
        >
          <Col style={{ display: "flex", alignItems: "center" }}>
            <div className={styles.wrapperRate}>
              <span className={styles.spanRate}>{detailProduct.rate}</span>
              <Rate
                disabled
                allowHalf
                defaultValue={detailProduct.rate}
                style={{ color: "#d0011b", fontSize: 15 }}
              />
            </div>
            <div className={styles.wrapperEvalute}>
              <span className={styles.valueEvalute}>
                {formatAmoutProductSold(detailProduct.evaluate)}
              </span>
              <span className={styles.spanEvalute}>Đánh giá</span>
            </div>
            <div className={styles.wrapperEvalute} style={{ border: "none" }}>
              <span className={styles.valueEvalute}>
                {formatAmoutProductSold(detailProduct.sold)}
              </span>
              <span className={styles.spanEvalute}>Đã bán</span>
            </div>
          </Col>
          <Col>
            <span className={styles.spanReport}>Tố cáo</span>
          </Col>
        </Row>
        {detailProduct.showSale && (
          <div style={{ marginTop: 20 }}>
            {detailProduct.flaseSale && (
              <FlashSale timeEnd={detailProduct.timeEndSale} />
            )}
            <Row className={styles.wrapperPrice} align="middle">
              <Text className={styles.textPriceOld} delete>
                {formatCurrency(detailProduct.priceOld)}
              </Text>
              <Text className={styles.textPriceNew}>
                {formatCurrency(detailProduct.priceNew)}
              </Text>
              <div className={styles.showSale}>
                {formatSalePercent(
                  detailProduct.priceOld,
                  detailProduct.priceNew
                )}
                % giảm
              </div>
            </Row>
          </div>
        )}
        <Row className={styles.wrapperListCoupons} align="middle">
          <Col xxl={5}>
            <span className={styles.textLabelInfo}>Mã giảm giá của shop</span>
          </Col>
          <Col xxl={19}>
            <Row gutter={[14]}>
              {detailProduct?.listCounpon.map((coupons) => (
                <Col>
                  <CoupounsShop key={coupons.id} number={coupons.value} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className={styles.wrapperListCoupons} >
          <Col xxl={5}>
            <span className={styles.textLabelInfo}>Bảo hiểm</span>
          </Col>
          <Col xxl={19}>
            <span>Bảo hiểm quyền lợi người tiêu dùng</span>
            <a className={styles.linkText}>Tìm hiểu thêm</a>
          </Col>
        </Row>

        <Row className={styles.wrapperListCoupons}>
          <Col xxl={5}>
            <span className={styles.textLabelInfo}>Vận chuyển</span>
          </Col>
          <Col xxl={19}>
            <Row align='middle'>
              <FlashShip height={25} width={30} />
              <span className={styles.textTitleSub}>Xử lý đơn hàng bởi shoppe</span>
            </Row>
            <Row align='middle' style={{ margin: '10px 0' }}>
              <Image src={freeShip} style={{ height: 30 }} preview={false} />
              <span className={styles.textTitleSub} style={{ color: '#000' }}>Miễn phí vận chuyển</span>
            </Row>
            <Row align='middle'>
              <Shipping height={25} width={30} />
              <span className={styles.textTitleSub} style={{ textTransform: 'capitalize' }}>Vận chuyển tới</span>
              <span style={{ textTransform: 'capitalize' }}>Phường tràng tiền, quận hoàn kiếm</span>
            </Row>
            <Row align='middle' style={{ margin: '10px 0' }}>
              <div style={{ width: 30 }} />
              <span className={styles.textTitleSub} style={{ textTransform: 'capitalize' }}>Phí vận chuyển</span>
              <span style={{ textTransform: 'capitalize' }}>{formatCurrency(0)}</span>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductInformation;
