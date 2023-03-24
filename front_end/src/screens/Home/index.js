import React from "react";
import { Col, Image, Row, Space } from "antd";


//image local
import returnPackage from '../../asset/image/return_package.png'
import ship from '../../asset/image/ship.png'
import safeBill from '../../asset/image/safe_bill.png'

import styles from '../../asset/scss/home.module.scss'
import Advertisement from "./components/Advertisement";
import Category from "./components/Category";

const Home = () => {

  return (
    <div>
      <Advertisement />
      <Row justify='space-between' className={styles.informationMall}>
        <Col>
          <Space size={16}>
            <Image className={styles.iconInformation} src={returnPackage} alt='icon trả hàng' preview={false} />
            <div>
              <h4 className={styles.titleInformation}>7 ngày miễn phí trả hàng</h4>
              <span className={styles.subTitleInformation}>Trả hàng miễn phí trong 7 ngày</span>
            </div>
          </Space>
        </Col>
        <Col>
          <Space size={16}>
            <Image className={styles.iconInformation} src={safeBill} alt='icon hàng chính hãng' preview={false} />
            <div>
              <h4 className={styles.titleInformation}>Hàng chính hãng 100%</h4>
              <span className={styles.subTitleInformation}>Đảm bảo hàng chính hãng hoặc hoàn tiền gấp đôi</span>
            </div>
          </Space>
        </Col>
        <Col>
          <Space size={16}>
            <Image className={styles.iconInformation} src={ship} alt='icon ship hàng' preview={false} />
            <div>
              <h4 className={styles.titleInformation}>Miễn phí vận chuyển</h4>
              <span className={styles.subTitleInformation}>Giao hàng miễn phí toàn quốc</span>
            </div>
          </Space>
        </Col>
      </Row>

      <Category />
    </div>
  )
}

export default Home