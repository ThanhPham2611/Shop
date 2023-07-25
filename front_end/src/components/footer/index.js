import React from "react";
import { Col, Row } from "antd";

import { footerData } from "../../utils/type";

//payment icon
import american from '../../asset/image/payment/american.png';
import code from '../../asset/image/payment/code.png';
import installment from '../../asset/image/payment/installment.png';
import jcb from '../../asset/image/payment/jcb.png';
import master_card from '../../asset/image/payment/master_card.png';
import pay_later from '../../asset/image/payment/pay_later.png';
import pay from '../../asset/image/payment/pay.png';
import visa from '../../asset/image/payment/visa.png';

//shipper icon
import ahamove from '../../asset/image/shipper/ahamove.png';
import giaohang from '../../asset/image/shipper/giao_hang.png';
import giaoHangNhanh from '../../asset/image/shipper/giao_hang_nhanh.jpg';
import grabExpress from '../../asset/image/shipper/grab_express.png';
import JTExpress from '../../asset/image/shipper/J&T_express.png';
import Ninja from '../../asset/image/shipper/ninja.png';
import shopeeExpress from '../../asset/image/shipper/shopee_express.png';
import viettelPost from '../../asset/image/shipper/viettel_post.png';
import viettelPost2 from '../../asset/image/shipper/viettel_post_2.png'

import styles from './footer.module.scss';

const FooterComponent = () => {
  return (
    <div className={styles.bg}>
      <Row className={styles.wrapperContent}>
        {footerData?.map(item => (
          <Col xxl={6} key={item.key} style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className={styles.title}>{item.title}</h3>

            {item.value?.map(span => (
              <a href='#' className={styles.valueTitle}>{span}</a>
            ))}
          </Col>
        ))}
        <Col xxl={6}>
          <h3 className={styles.title}>Thanh toán</h3>

          <div className={styles.groupIconPayment}>
            <img src={visa} alt='visa' />
            <img src={master_card} alt='master card' />
            <img src={jcb} alt='jcb' />
          </div>
          <div className={styles.groupIconPayment}>
            <img src={american} alt='american' />
            <img src={code} alt='code' />
            <img src={installment} alt='installment' />
          </div>
          <div className={styles.groupIconPayment}>
            <img src={pay} alt='pay' />
            <img src={pay_later} alt='pay later' />
          </div>

          <h3 className={styles.title} style={{ marginTop: 30 }}>Đơn vị vận chuyển</h3>
          <div className={styles.groupIconPayment}>
            <img src={ahamove} alt='ahamove' />
            <img src={giaohang} alt='giao hang' />
            <img src={giaoHangNhanh} alt='giao hang nhanh' />
          </div>
          <div className={styles.groupIconPayment}>
            <img src={grabExpress} alt='grab express' />
            <img src={JTExpress} alt='J&T express' />
            <img src={Ninja} alt='ninja' />
          </div>
          <div className={styles.groupIconPayment}>
            <img src={shopeeExpress} alt='shopee express' />
            <img src={viettelPost} alt='viettel post' />
            <img src={viettelPost2} alt='viettel post 2' />
          </div>
        </Col>

        <Col xxl={6}>
          <h3 className={styles.title}>Theo dõi chúng tôi trên</h3>
        </Col>

      </Row>
    </div>
  )
}

export default FooterComponent;