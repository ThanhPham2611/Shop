import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';

import {
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons';

import { listCategory } from "../../../../utils/dummyData";
import ListBrand from "../ListBrand";
import { productMall } from "../../../../store/modules/productSlice";

import 'react-multi-carousel/lib/styles.css';
import styles from './category.module.scss';
import { Button } from "antd";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10
  },
}

const Category = () => {
  const dispatch = useDispatch();
  const carouselRef = useRef(null);

  const { listMall } = useSelector(state => state.productInfo);

  useEffect(() => {
    dispatch(productMall());
  }, [])

  const handleNext = () => {
    carouselRef.current.next();
  }

  const handleBack = () => {
    carouselRef.current.previous();
  }

  return (
    <div className={styles.itemContainer}>
      <h2>Danh mục</h2>
      <div className={styles.category}>
        <Carousel ref={carouselRef} responsive={responsive} arrows={false} >
          {listCategory?.map((items, index) => (
            <a key={index} className={styles.wrapperItem}>
              <img src={items.image} className={styles.imageItem} />
              <span className={styles.titleItem}>{items.nameCategory}</span>
            </a>
          ))}
        </Carousel>
        <Button className={[styles.button, styles.right]} icon={<RightOutlined />} onClick={handleNext} />
        <Button className={[styles.button, styles.left]} icon={<LeftOutlined />} onClick={handleBack} />
      </div>
      <h1 className={styles.titleBrand}>Thương hiệu nổi bật trong ngày</h1>
      {listMall?.map((data) => (
        <ListBrand key={data.items._id} imageBrand={data.linkBanner} altImageBrand={data.linkBanner} categoryProduct={data.items} />
      ))}
    </div >
  )
}

export default Category