import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { Col, Image, Rate, Row, Typography } from "antd";
import ReactPlayer from 'react-player'
import CountDown from 'react-countdown';
import moment from 'moment'

import { detailProduct } from "../../../utils/dummyData";
import { formatAmoutProductSold, formatCurrency, formatSalePercent } from "../../../utils/function";
import FlashSaleIcon from '../../../asset/image/flash_sale_icon.png'

import styles from './information.module.scss';
import { OClock } from "../../../asset/image/svg/oclock";

const { Text } = Typography

const ProductInformation = () => {
  // const { id } = useParams()
  const [hover, setHover] = useState(false)

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className={styles.wrapperCountDown}>
          <span className={styles.textCountdown}>{hours}</span> :
          <span className={styles.textCountdown}>{minutes}</span> :
          <span className={styles.textCountdown}>{seconds}</span>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapperCountDown}>
          <span className={styles.textCountdown}>{hours < 10 ? `0${hours}` : hours}</span> :
          <span className={styles.textCountdown}>{minutes < 10 ? `0${minutes}` : minutes}</span> :
          <span className={styles.textCountdown}>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
      )
    }
  };

  const hoverMouse = (e) => {
    console.log(e)
  }

  return (
    <Row className={styles.wrapperInformation}>
      <Col xxl={9}>
        {
          detailProduct.listImage[0].type === 'vid' ?
            <ReactPlayer url={detailProduct.listImage[0].url} height={500} width={500} playing={true} volume={0} /> :
            <Image url={detailProduct.listImage[0].url} height={400} />
        }
        <Row style={{ marginTop: 10 }} align='middle'>
          {
            detailProduct.listImage.map(dataImage => {
              return dataImage.type === 'vid' ? (
                <div key={dataImage.id} className={styles.listImage}>
                  <Image
                    className={[hover ? styles.borderClassImage : styles.noneBorderClassImage]}
                    onMouseEnter={(e) => hoverMouse(e)}
                    onMouseLeave={() => setHover(false)}
                    src={dataImage.urlImagePreview}
                    height={100}
                    preview={false}
                  />
                </div>
              ) : (
                <Image
                  key={dataImage.id}
                  className={styles.listImage}
                  src={dataImage.url}
                  height={100}
                  preview={false}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                />
              )
            }
            )
          }
        </Row>
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
          <div style={{ marginTop: 20 }}>
            {detailProduct.flaseSale && (
              <div className={styles.wrapperFlashSale}>
                <Image className={styles.iconFlashSale} src={FlashSaleIcon} alt='Flash sale' preview={false} />
                <Row align='middle'>
                  <OClock />
                  <span className={styles.textFlashSale}>Kết thúc trong</span>
                  <CountDown date={moment(detailProduct.timeEndSale).format()} renderer={renderer} zeroPadTime={2} />
                </Row>
              </div>
            )}
            <Row className={styles.wrapperPrice} align='middle'>
              <Text className={styles.textPriceOld} delete>{formatCurrency(detailProduct.priceOld)}</Text>
              <Text className={styles.textPriceNew}>{formatCurrency(detailProduct.priceNew)}</Text>
              <div className={styles.showSale}>{formatSalePercent(detailProduct.priceOld, detailProduct.priceNew)}% giảm</div>
            </Row>
          </div>
        )}

      </Col>
    </Row>
  )
}

export default ProductInformation