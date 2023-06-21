import React, { useRef } from "react";
import { Button, Image, Spin } from 'antd';
import Carousel from 'react-multi-carousel';

import {
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons';

import 'react-multi-carousel/lib/styles.css';

import styles from './carousel.module.scss';

const CarouselImage = ({ data, linkImage }) => {
  const carouselRef = useRef(null);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
  }

  const handleNext = () => {
    carouselRef.current.next();
  }
  const handleBack = () => {
    carouselRef.current.previous();
  }

  return data ? (
    <div style={{ position: 'relative' }}>
      <Carousel ref={carouselRef} responsive={responsive} arrows={false} containerClass={styles.wrapperCarousel} >
        {data?.map((items, index) => (
          <Image onMouseEnter={(e) => linkImage(e)} height={100} key={index} src={items} preview={false} />
        ))}
      </Carousel>
      <RightOutlined className={[styles.arrow, styles.right]} onClick={handleNext} />
      <LeftOutlined className={[styles.arrow, styles.left]} onClick={handleBack} />
    </div>
  ) : <Spin />
}

export default CarouselImage;