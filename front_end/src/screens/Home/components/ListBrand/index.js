import { Col, Image, Row, Space, Typography } from "antd";
import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { Coupons, Tags } from "../../../../components/ticketSale";
import {
  formatCurrency,
  formatMultiCurrency,
} from "../../../../utils/function";

import styles from "./listBrand.module.scss";
import { typeTicket } from "../../../../utils/type";
import { useHistory } from "react-router-dom";

const { Text } = Typography;

const ListBrand = ({ imageBrand, altImageBrand, categoryProduct }) => {
  const history = useHistory();

  return (
    <div className={styles.wrapperProduct}>
      <Image
        className={styles.imageBrand}
        src={imageBrand}
        alt={altImageBrand}
        preview={false}
      />
      <Row gutter={[0, 16]} className={styles.rowItem}>
        {categoryProduct?.map((data) => (
          <Col
            key={data.id}
            className={styles.itemBrand}
            onClick={() => history.push(`/detail/${data.id}`)}
          >
            <div className={styles.wrapperSoldOff}>
              <Image
                className={styles.imageItemBrand}
                src={data.src}
                alt={data.alt}
                preview={false}
              />
              {data.soldOff && (
                <div className={styles.iconSoldOff}>Hết hàng</div>
              )}
            </div>
            <div className={styles.nameItemBrand}>{data.name}</div>
            {data.tagTicket.length > 0 ? (
              <Space className={styles.wrapperTicket}>
                {data.tagTicket?.map((ticket) => (
                  <Col key={ticket.id}>
                    {ticket.type === typeTicket.coupons && (
                      <Coupons number={ticket.value} />
                    )}
                    {ticket.type === typeTicket.tag && (
                      <Tags value={ticket.value} />
                    )}
                  </Col>
                ))}
              </Space>
            ) : (
              <div style={{ height: 20 }} />
            )}
            <Row
              justify="space-between"
              align="bottom"
              className={styles.wrapperPrice}
            >
              {data?.showSale ? (
                data?.multiPrice ? (
                  <Col style={{ display: "flex", flexDirection: "column" }}>
                    <Text
                      delete
                      className={[styles.priceOld, styles.multiPrice]}
                    >
                      {formatMultiCurrency(
                        data.multiPriceOld[0],
                        data.multiPriceOld[1]
                      )}
                    </Text>
                    <Text className={[styles.priceNew, styles.multiPrice]}>
                      {formatMultiCurrency(
                        data.multiPriceNew[0],
                        data.multiPriceNew[1]
                      )}
                    </Text>
                  </Col>
                ) : (
                  <Col style={{ display: "flex", flexDirection: "column" }}>
                    <Text delete className={styles.priceOld}>
                      {formatCurrency(data.priceOld)}
                    </Text>
                    <Text className={styles.priceNew}>
                      {formatCurrency(data.priceNew)}
                    </Text>
                  </Col>
                )
              ) : data?.multiPrice ? (
                <Col>
                  <Text className={styles.priceNew}>{`${formatCurrency(
                    data.multiPriceNew[0]
                  )}-${formatCurrency(data.multiPriceNew[1])}`}</Text>
                </Col>
              ) : (
                <Col>
                  <Text className={styles.priceNew}>
                    {formatCurrency(data.priceNew)}
                  </Text>
                </Col>
              )}
              <Col>
                <ShoppingCartOutlined className={styles.iconShopping} />
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListBrand;
