import { Button, Carousel, Col, Image, Row } from "antd";
import React, { useRef } from "react";
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

import styles from './Adv.module.scss'

const Advertisement = () => {
  const carouselRef = useRef()

  return (
    <Row className={styles.advertisement} gutter={[8, 16]}>
      <Col span={15} className={styles.wrapperImageAd}>
        <Carousel autoplay ref={carouselRef}>
          <Image src='https://cf.shopee.vn/file/vn-50009109-bc4966393f0a7049485b2315963efb2f_xxhdpi' className={styles.imageAdvertisement} preview={false} />
          <Image src='https://cf.shopee.vn/file/vn-50009109-d631cc725df84d6f229dcd91449609d8_xxhdpi' className={styles.imageAdvertisement} preview={false} />
          <Image src='https://cf.shopee.vn/file/vn-50009109-9f60b2294a419481697f332c3e859175_xxhdpi' className={styles.imageAdvertisement} preview={false} />
        </Carousel>
        <Button className={[styles.buttonImage, styles.next]} onClick={() => carouselRef.current.next()} icon={<RightOutlined style={{ color: 'white', fontSize: 30 }} />} />
        <Button className={[styles.buttonImage, styles.prev]} onClick={() => carouselRef.current.prev()} icon={<LeftOutlined style={{ color: 'white', fontSize: 30 }} />} />
      </Col>
      <Col span={9} className={styles.wrapperSubImage}>
        <Image src='https://cf.shopee.vn/file/vn-50009109-1449c471f0e2d5bd13defef058e1ce5c_xhdpi' className={styles.subImageAdvertisement} preview={false} />
        <Image src='https://cf.shopee.vn/file/vn-50009109-c80de57731427688bd918e67f13c85dc_xhdpi' className={styles.subImageAdvertisement} preview={false} />
      </Col>
    </Row>
  )
}

export default Advertisement