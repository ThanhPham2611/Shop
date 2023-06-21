import { Col, Image, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { listCategory, listProduct } from "../../../../utils/dummyData";
import ListBrand from "../ListBrand";
import { productMall } from "../../../../store/modules/productSlice";

import styles from './category.module.scss';

const Category = () => {
  const dispatch = useDispatch();

  const { listMall } = useSelector(state => state.productInfo);

  useEffect(() => {
    dispatch(productMall());
  }, [])

  return (
    <div className={styles.itemContainer}>
      <h2>Danh mục</h2>
      <Row className={styles.rowItem} justify='space-between'>
        {listCategory.map((data, index) => (
          <Col key={index} className={styles.wrapperItem}>
            <div style={{ height: 100 }}>
              <Image className={styles.imageItem} src={data.image} preview={false} />
            </div>
            <span style={{ textAlign: 'center', height: 40 }}>{data.nameCategory}</span>
          </Col>
        ))}
      </Row>
      <h1 className={styles.titleBrand}>Thương hiệu nổi bật trong ngày</h1>
      {listMall?.map((data) => (
        <ListBrand key={data.items._id} imageBrand={data.linkBanner} altImageBrand={data.linkBanner} categoryProduct={data.items} />
      ))}
    </div >
  )
}

export default Category