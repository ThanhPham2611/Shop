import React, { useState } from "react";
import { Avatar, Col, Divider, Rate, Row, Space } from 'antd';

import { BiLike } from 'react-icons/bi'

import { typeReview } from "../../../utils/type";
import Variation from "../../../components/variation";

import styles from './review.module.scss';

const ReviewProduct = () => {
  const [highlight, setHighlight] = useState(0);
  const [like, setLike] = useState(false);

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

  const commentData = [
    {
      _id: '12312312',
      user: {
        name: 'thanhpt',
        linkAvatvar: 'https://pethouse.com.vn/wp-content/uploads/2022/12/Ngoai-hinh-husky-768x1024-1-600x800.jpg',
      },
      rate: 5,
      dateReview: '2023-05-09 01:29',
      contentComment: [
        {
          title: 'Chất liệu',
          value: 'Bamboo'
        },
        {
          title: 'Màu sắc',
          value: '3 màu'
        },
        {
          title: 'Đúng với mô tả',
          value: 'Đúng mô tả'
        }
      ],
      description: 'Tôi nói với ae là không còn gì để chê hàng coolmate luôn ấy. Dịch vụ chăm sóc khách hàng quá tốt, đổi trả hàng trong 60 ngày. Hàng mặc co dãn cực kì thoải mái và dễ chịu. Từ giờ mk chuyển sang tin dùng coolmate thôi. 10/10 điểm. Giao hàng nhanh, đóng gói kĩ lưỡng, đẹp',
      listImage: ['https://down-ws-vn.img.susercontent.com/vn-11134103-7qukw-lgjrrf8hiz1z3c_tn.webp', 'https://down-ws-vn.img.susercontent.com/vn-11134103-7qukw-lgjrrm6rcq9j4b_tn.webp'],
      like: 18
    }
  ]

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

      {commentData?.map(items => (
        <Row key={items._id}>
          <Col xxl={2}>
            <Avatar src={items.user.linkAvatvar} size={50} />
          </Col>

          <Col xxl={18}>
            <div>{items.user.name}</div>
            <Rate disabled={true} value={5} style={{ color: '#d0011b', fontSize: 11 }} />
            <div className={styles.wrapperDate}>
              <span className={styles.dateTime}>2023-05-09 01:29</span>
              <Divider type='vertical' />
              <span >Phân loại hàng: ĐEN-TRẮNG-NAVY,XXL</span>
            </div>
            {items?.contentComment?.map((comment, index) => (
              <Row key={index} className={styles.wrapperComment}>
                <span className={styles.label}>{comment.title}: </span>
                <span>{comment.value}</span>
              </Row>
            ))}
            <div className={styles.description}>Giao hàng trong 4 ngày - hợp lí - cảm nhận đầu khá xịn xò</div>
            <Space className={styles.wrapperImageReview}>
              {items?.listImage?.map((image, index) => (
                <img src={image} key={index} className={styles.imageReview} />
              ))}
            </Space>
            <Row align='middle'>
              <BiLike style={{ color: like ? '#ee4d2d' : 'rgba(0,0,0,.2)', fontSize: 17, cursor: 'pointer' }} onClick={() => setLike(!like)} />
              <span className={styles.textLike}>{items.like}</span>
            </Row>
          </Col>
        </Row>
      ))}
    </div>
  )
}

export default ReviewProduct;