import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Divider, Image, Rate, Row, Space, Typography, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from 'nanoid';

import { detailProduct } from "../../../utils/dummyData";
import {
  checkLogin,
  formatAfterSale,
  formatAmoutProductSold,
  formatCurrency,
} from "../../../utils/function";
import { ButtonFirst, ButtonSecond } from "../../../components/button";
import InputAmount from "../../../components/input_plus_min";
import { FlashSale } from "../../../components/flashSale";
import { CoupounsShop, TagDeal } from "../../../components/ticketSale";
import { get } from "../../../service/axios/instance";
import { addCart, getSelect } from "../../../store/modules/cartSlice";
import CarouselImage from "./components/carousel";
import Variation from "../../../components/variation";

import {
  Cart,
  FaceBook,
  FlashShip,
  HeartEmpty,
  Messenger,
  Shipping,
} from "../../../asset/image/svg/iconSvg";
import freeShip from "../../../asset/image/free-shipping.png";
import returnPackage from "../../../asset/image/return_package.png";
import safeBill from "../../../asset/image/safe_bill.png";
import ship from "../../../asset/image/ship.png";

import styles from "./information.module.scss";

const { Text } = Typography;

const ProductInformation = () => {
  const valueRef = useRef(null);
  const { id } = useParams();
  const [productValue, setProductValue] = useState();
  const [linkImage, setLinkImage] = useState("");
  const [highlight, setHighlight] = useState();
  const [chooseItem, setChooseItem] = useState();
  const [errText, setErrText] = useState(false);

  const dispatch = useDispatch();

  const { select } = useSelector((state) => state.cartInfo);

  useEffect(() => {
    setLinkImage(select.image);
  }, [select]);

  useEffect(() => {
    (async () => {
      const { item } = await get(`product/${id}`);
      setProductValue(item);
      setLinkImage(item.listImage[0]);
    })();
  }, [id]);

  const hoverMouse = (e) => {
    setLinkImage(e.target.src);
  };

  const handleAddCart = () => {
    if (checkLogin()) {
      if (productValue.typeProduct.length > 0) {
        if (chooseItem) {
          const dataProduct = {
            _id: nanoid(),
            productId: productValue._id,
            shopId: productValue.shopId,
            title: productValue.title,
            image: productValue.listImage[0],
            price: productValue.price,
            amount: valueRef.current.getValue(),
            salePercent: productValue.salePercent,
            type: 1,
            typeProductDetail: {
              ...chooseItem
            }
          }
          console.log(dataProduct);
          dispatch(addCart(dataProduct));
          notification.success({ message: 'Sản phẩm đã được thêm vào giỏ hàng' })
        } else {
          setErrText(true);
        }
      } else {
        const dataProduct = {
          _id: nanoid(),
          productId: productValue._id,
          shopId: productValue.shopId,
          title: productValue.title,
          image: productValue.listImage[0],
          price: productValue.price,
          amount: valueRef.current.getValue(),
          salePercent: productValue.salePercent,
          type: 1,
        };
        console.log(dataProduct);
        dispatch(addCart(dataProduct));
        notification.success({ message: 'Sản phẩm đã được thêm vào giỏ hàng' })
      }
    }
  };

  const handleClick = (item, index) => {
    if (highlight !== index) {
      setHighlight(index);
      dispatch(getSelect(item));
      setChooseItem(item);
      setErrText(false);
    }
  };

  return (
    <Row className={styles.wrapperInformation} justify="space-between">
      <Col xxl={8}>
        <Image src={linkImage || productValue?.listImage[0]} height={400} />
        <CarouselImage data={productValue?.listImage} linkImage={hoverMouse} />
        <Row className={styles.rowSocialMedia} align="middle">
          <Col span={7}>
            <Space>
              <span>Chia sẻ: </span>
              <Messenger onClick={() => console.log("messager")} />
              <FaceBook />
            </Space>
          </Col>
          <Col>
            <Space>
              <HeartEmpty onClick={() => console.log("heartP")} />
              <span>Đã thích(122)</span>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col xxl={15}>
        <span className={styles.titleProduct}>{productValue?.title}</span>
        <Row
          className={styles.infoSaleProduct}
          justify="space-between"
          align="middle"
        >
          <Col style={{ display: "flex", alignItems: "center" }}>
            <div className={styles.wrapperRate}>
              <span className={styles.spanRate}>{detailProduct.rate}</span>
              <Rate
                disabled
                allowHalf
                defaultValue={detailProduct.rate}
                style={{ color: "#d0011b", fontSize: 15 }}
              />
            </div>
            <div className={styles.wrapperEvalute}>
              <span className={styles.valueEvalute}>
                {formatAmoutProductSold(detailProduct.evaluate)}
              </span>
              <span className={styles.spanEvalute}>Đánh giá</span>
            </div>
            <div className={styles.wrapperEvalute} style={{ border: "none" }}>
              <span className={styles.valueEvalute}>
                {formatAmoutProductSold(detailProduct.sold)}
              </span>
              <span className={styles.spanEvalute}>Đã bán</span>
            </div>
          </Col>
          <Col>
            <span className={styles.spanReport}>Tố cáo</span>
          </Col>
        </Row>
        {productValue?.showSale && (
          <div style={{ marginTop: 20 }}>
            {productValue?.flashSale && (
              <FlashSale timeEnd={productValue?.timeEndSale} />
            )}
            <Row className={styles.wrapperPrice} align="middle">
              <Text className={styles.textPriceOld} delete>
                {formatCurrency(select.price || productValue.price)}
              </Text>
              <Text className={styles.textPriceNew}>
                {formatAfterSale(
                  select.price || productValue.price,
                  select.salePercent || productValue.salePercent
                )}
              </Text>
              <div className={styles.showSale}>
                {select.salePercent || productValue.salePercent}% giảm
              </div>
            </Row>
          </div>
        )}
        <Row className={styles.wrapperListCoupons} align="middle">
          <Col xxl={5}>
            <span className={styles.textLabelInfo}>Mã giảm giá của shop</span>
          </Col>
          <Col xxl={19}>
            <Row gutter={[14]}>
              {detailProduct?.listCounpon.map((coupons) => (
                <Col>
                  <CoupounsShop key={coupons.id} number={coupons.value} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {productValue?.ticketTag?.length > 0 && (
          <Row className={styles.wrapperListCoupons} align="middle">
            <Col xxl={5}>
              <span className={styles.textLabelInfo}>Deal sốc</span>
            </Col>
            <Col xxl={19}>
              <Row gutter={[14]}>
                {productValue?.ticketTag?.map((ticket, index) => (
                  <Col>
                    <TagDeal key={index} title={ticket.title} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}

        <Row className={styles.wrapperListCoupons}>
          <Col xxl={5}>
            <span className={styles.textLabelInfo}>Bảo hiểm</span>
          </Col>
          <Col xxl={19}>
            <span>Bảo hiểm quyền lợi người tiêu dùng</span>
            <a className={styles.linkText}>Tìm hiểu thêm</a>
          </Col>
        </Row>

        <Row className={styles.wrapperListCoupons}>
          <Col xxl={5}>
            <span className={styles.textLabelInfo}>Vận chuyển</span>
          </Col>
          <Col xxl={19}>
            <Row align="middle">
              <FlashShip height={25} width={30} />
              <span className={styles.textTitleSub}>
                Xử lý đơn hàng bởi shoppe
              </span>
            </Row>
            <Row align="middle" style={{ margin: "10px 0" }}>
              <Image src={freeShip} style={{ height: 30 }} preview={false} />
              <span className={styles.textTitleSub} style={{ color: "#000" }}>
                Miễn phí vận chuyển
              </span>
            </Row>
            <Row align="middle">
              <Shipping height={25} width={30} />
              <span
                className={styles.textTitleSub}
                style={{ textTransform: "capitalize" }}
              >
                Vận chuyển tới
              </span>
              <span style={{ textTransform: "capitalize" }}>
                Phường tràng tiền, quận hoàn kiếm
              </span>
            </Row>
            <Row align="middle" style={{ margin: "10px 0" }}>
              <div style={{ width: 30 }} />
              <span
                className={styles.textTitleSub}
                style={{ textTransform: "capitalize" }}
              >
                Phí vận chuyển
              </span>
              <span style={{ textTransform: "capitalize" }}>
                {formatCurrency(0)}
              </span>
            </Row>
          </Col>
        </Row>

        {productValue?.typeProduct.length > 0 && (
          <Row align="middle" style={{ marginTop: 10 }}>
            <Col xxl={5}>
              <span className={styles.textLabelInfo}>Variation</span>
            </Col>
            <Col xxl={17}>
              <Variation
                data={productValue?.typeProduct}
                handleClick={handleClick}
                indexClick={highlight}
                err={errText}
              />
            </Col>
          </Row>
        )}

        <Row align="middle" style={{ marginTop: 30 }}>
          <Col xxl={5}>
            <span className={styles.textLabelInfo}>Số lượng</span>
          </Col>
          <Col xxl={4}>
            <InputAmount ref={valueRef} />
          </Col>
          <Col xxl={7}>
            <span
              className={styles.textTitleSub}
              style={{ textTransform: "capitalize" }}
            >
              {select.amount || productValue?.amount} sản phẩm có sẵn
            </span>
          </Col>
        </Row>

        <Row className={styles.rowButton} align="middle">
          <Space size={25}>
            <ButtonSecond
              title={"Thêm vào giỏ hàng"}
              icon={<Cart color={"#d0011b"} height={25} width={25} />}
              onClick={handleAddCart}
            />
            <ButtonFirst title="Mua ngay" />
          </Space>
        </Row>
        <Divider />

        <Row align="middle" justify="space-around">
          <Col>
            <Space>
              <Image
                style={{ height: 25 }}
                src={returnPackage}
                preview={false}
              />
              <span>7 ngày miễn phí trả hàng</span>
            </Space>
          </Col>
          <Col>
            <Space>
              <Image style={{ height: 25 }} src={safeBill} preview={false} />
              <span>Hàng chính hãng 100%</span>
            </Space>
          </Col>
          <Col>
            <Space>
              <Image style={{ height: 25 }} src={ship} preview={false} />
              <span>Miễn phí vận chuyển</span>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductInformation;
