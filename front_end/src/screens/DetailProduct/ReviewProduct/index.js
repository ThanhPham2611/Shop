import React, { useState } from "react";
import { Avatar, Col, Rate, Row } from 'antd';

import styles from './review.module.scss';
import { typeReview } from "../../../utils/type";
import Variation from "../../../components/variation";



const ReviewProduct = () => {
  const [highlight, setHighlight] = useState(0)

  const handleClick = (items, index) => {
    setHighlight(index);
    console.log(items)
  }

  const listReview = [
    {
      title: 'Tất cả',
      type: typeReview.all
    },
    {
      title: '5 sao',
      type: typeReview.fiveStar
    },
    {
      title: '4 sao',
      type: typeReview.fourStar
    },
    {
      title: '3 sao',
      type: typeReview.threeStar
    },
    {
      title: '2 sao',
      type: typeReview.twoStar
    },
    {
      title: '1 sao',
      type: typeReview.oneStar
    },
    {
      title: 'Có bình luận',
      type: typeReview.haveComment
    },
    {
      title: 'Có hình ảnh',
      type: typeReview.haveImage
    }
  ];



  return (
    <div className={styles.wrapperReview}>
      <h2>Đánh giá sản phẩm</h2>

      <Row className={styles.containerRating} align='middle'>
        <Col xxl={6}>
          <div>
            <span className={styles.textRating}>4.9</span>
            <span className={styles.textDefaultRating}>trên 5</span>
          </div>
          <Rate disabled={true} value={5} style={{ color: "#d0011b" }} />
        </Col>

        <Col xxl={18}>
          <Variation data={listReview} handleClick={handleClick} indexClick={highlight} />
        </Col>
      </Row>

      <Row>

      </Row>

    </div>
  )
}

export default ReviewProduct;