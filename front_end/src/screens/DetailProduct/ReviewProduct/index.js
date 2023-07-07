import React, { useEffect, useState } from "react";
import { Avatar, Col, Divider, Empty, Rate, Row, Space } from 'antd';
import { useParams } from 'react-router-dom';

import { BiLike } from 'react-icons/bi'
import { UserOutlined } from '@ant-design/icons';

import { get, post } from '../../../service/axios/instance'
import { formatTimeFull, listReview } from "../../../utils/type";
import Variation from "../../../components/variation";

import styles from './review.module.scss';
import moment from "moment";
import { socket } from "../../../service/socket";

const ReviewProduct = () => {
  const [highlight, setHighlight] = useState(0);
  const [page, setPage] = useState({
    current: 1,
    items: 10
  })

  const [valueComment, setValueComment] = useState([]);
  const [valueRate, setValueRate] = useState([]);
  const [valueLike, setValueLike] = useState([]);
  const [valueUserLike, setValueUserLike] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await get(`comment/${id}?page=${page.current}&item=${page.items}`)
        .then(data => {
          const { comments, rates } = data;
          setValueComment(comments)
          setValueRate(rates);
        })
        .catch(err => console.log(err))

      await get(`like/${id}`)
        .then(data => {
          const { likeInfo, dataUserLike } = data;
          setValueLike(likeInfo);
          setValueUserLike(dataUserLike);
        })
        .catch(err => {
          console.log(err);
        })
    })()
  }, [])

  useEffect(() => {
    socket.on('likefc', async () => {
      await get(`like/${id}`)
        .then(data => {
          const { likeInfo, dataUserLike } = data;
          setValueLike(likeInfo);
          setValueUserLike(dataUserLike);
        })
        .catch(err => {
          console.log(err);
        })
    })
  }, [])

  const totalRate = valueRate.reduce((acc, current) => {
    return acc + current.rate
  }, 0)

  const handleClick = (items, index) => {
    setHighlight(index);
    console.log(items)
    get(`comment/${id}?page=${page.current}&item=${page.items}&rate=${items.type}`)
      .then(data => {
        const { comments, rates } = data;
        setValueComment(comments);
      })
      .catch(err => console.log(err))
  }

  const handleLikeComment = (items, isLike) => {
    post('like', {
      productId: items.productId,
      commentId: items._id,
      isLike: !isLike
    })
      .then(() => {
        socket.emit('like');
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className={styles.wrapperReview}>
      <h2>Đánh giá sản phẩm</h2>

      <Row className={styles.containerRating} align='middle'>
        <Col xxl={6}>
          <div>
            <span className={styles.textRating}>{totalRate}</span>
            <span className={styles.textDefaultRating}>trên 5</span>
          </div>
          <Rate disabled={true} value={5} style={{ color: "#d0011b" }} />
        </Col>

        <Col xxl={18}>
          <Variation data={listReview} handleClick={handleClick} indexClick={highlight} />
        </Col>
      </Row>

      {valueComment.length > 0 ? valueComment?.map(items => {
        const arrayItemLike = valueLike.filter(filter => filter.isLike && filter.commentId === items._id);
        const checkLike = valueUserLike.every((every) => every.commentId === items._id && every.isLike);
        return (
          <Row key={items._id}>
            <Col xxl={2}>
              {items.user.linkAvatar ? <Avatar src={items.user.linkAvatvar} size={50} /> : <Avatar icon={<UserOutlined />} size={50} />}
            </Col>

            <Col xxl={18}>
              <div>{items.user.username}</div>
              <Rate disabled={true} value={items.rate} style={{ color: '#d0011b', fontSize: 11 }} />
              <div className={styles.wrapperDate}>
                <span className={styles.dateTime}>{moment(items.updatedAt).format(formatTimeFull)}</span>
                {items.typeName &&
                  <>
                    <Divider type='vertical' />
                    <span >Phân loại hàng: {items.typeName}</span>
                  </>
                }
              </div>
              {items?.commentOptions?.map((comment, index) => (
                <Row key={index} className={styles.wrapperComment}>
                  <span className={styles.label}>{comment.title}: </span>
                  <span>{comment.value}</span>
                </Row>
              ))}
              <div className={styles.description}>{items.description}</div>
              <Space className={styles.wrapperImageReview}>
                {items?.listImage?.map((image, index) => (
                  <img src={image} key={index} className={styles.imageReview} />
                ))}
              </Space>
              <Row align='middle'>
                <BiLike style={{ color: checkLike ? '#ee4d2d' : 'rgba(0,0,0,.2)', fontSize: 17, cursor: 'pointer' }} onClick={() => handleLikeComment(items, checkLike)} />
                <span className={styles.textLike}>{arrayItemLike.length || 0}</span>
              </Row>
            </Col>
          </Row>
        )
      }) : <Empty description='Không có dữ liệu' />}
    </div>
  )
}

export default ReviewProduct;