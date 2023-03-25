import { Col, Image, Row } from "antd";
import React from "react";

import { listCategory, listProduct } from "../../../../utils/dummyData";
import ListBrand from "../ListBrand";

import styles from './category.module.scss';

const Category = () => {
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
      {listProduct?.map((data) => (
        <ListBrand key={data._id} imageBrand={data.imageBrand} altImageBrand={data.altImageBrand} categoryProduct={data.products} />
      ))}
    </div >
  )
}

export default Category