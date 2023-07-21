import React, { useEffect, useState } from "react";
import { Avatar, Col, Row, Space } from "antd";
import { useParams } from 'react-router-dom';
import moment from "moment";
import { useDispatch } from 'react-redux';
import randomstring from 'randomstring';

import logoMall from '../../../asset/image/logo_shoppe_mall.png';
import { BsChatRightDotsFill, BsShop, BsDot } from 'react-icons/bs'

import { formatAmoutProductSold } from "../../../utils/function";
import { ButtonSecond } from "../../../components/button";
import { get } from '../../../service/axios/instance';

import styles from './infoshop.module.scss';
import { getId } from "../../../store/modules/messageSlice";

const InfoShop = () => {
  const { id } = useParams();
  const [infoShop, setInfoShop] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await get(`shop_info/${id}`)
        .then(data => {
          console.log(data)
          setInfoShop(data);
        })
        .catch(err => {
          console.log(err);
        })
    })()
  }, [])

  const handleChatNow = () => {
    const dataShop = {
      id: infoShop.shopInfo.owner._id,
      user: {
        username: infoShop.shopInfo.username,
        avatarUrl: infoShop.userInfo.avatarUrl,
      },
      roomId: randomstring.generate()
    }
    dispatch(getId(dataShop));
  }

  return (
    <Row className={styles.wrapperInfoShop} align='middle'>
      <Col className={styles.colAvatar}>
        <Avatar size={80} src={infoShop?.shopInfo.avatarShop} style={{ border: '1px solid #ccc' }} />
        {infoShop?.shopInfo.shopMall && <img src={logoMall} className={styles.logoMall} />}
      </Col>
      <Col className={styles.colAction}>
        <h3>{infoShop?.shopInfo?.username}</h3>
        {infoShop?.userInfo.status ? (
          <Row align='middle'>
            <BsDot style={{ fontSize: 25, color: 'green' }} />
            <span className={styles.textActive}>Online</span>
          </Row>
        ) : <h5 className={styles.textActive}>{`Online ${moment(infoShop?.userInfo?.lastLogin).fromNow()}`}</h5>}

        <Space className={styles.wrapperButton}>
          <ButtonSecond onClick={handleChatNow} icon={<BsChatRightDotsFill size={13} style={{ marginRight: 10 }} />} title={'Chat ngay'} className={styles.buttonChat} />
          <button className={styles.buttonViewShop}>
            <BsShop size={15} style={{ marginRight: 10 }} />
            Xem shop
          </button>
        </Space>
      </Col>
      <Col xxl={4} className={styles.colDescription}>
        <Row className={styles.wrapperDescription} justify='space-between'>
          <span className={styles.label}>Đánh giá</span>
          <span className={styles.value}>{formatAmoutProductSold(infoShop?.rateInfo)}</span>
        </Row>
        <Row className={styles.wrapperDescription} justify='space-between'>
          <span className={styles.label}>Sản phẩm</span>
          <span className={styles.value}>{infoShop?.productInfo}</span>
        </Row>
      </Col>
      <Col xxl={6} className={styles.colDescription}>
        <Row className={styles.wrapperDescription} justify='space-between'>
          <span className={styles.label}>Tỷ lệ phản hồi</span>
          <span className={styles.value}>100%</span>
        </Row>
        <Row className={styles.wrapperDescription} justify='space-between'>
          <span className={styles.label}>Thời gian phản hổi</span>
          <span className={styles.value}>Trong vài giờ</span>
        </Row>
      </Col>
      <Col xxl={5} className={styles.colDescription}>
        <Row className={styles.wrapperDescription} justify='space-between'>
          <span className={styles.label}>Tham gia</span>
          <span className={styles.value}>{moment(infoShop?.shopInfo?.createdAt).fromNow()}</span>
        </Row>
        <Row className={styles.wrapperDescription} justify='space-between'>
          <span className={styles.label}>Người theo dõi</span>
          <span className={styles.value}>{infoShop?.followerInfo}</span>
        </Row>
      </Col>
    </Row>
  )
}

export default InfoShop