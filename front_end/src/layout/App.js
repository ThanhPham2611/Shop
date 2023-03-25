import React from 'react';
import { Badge, Col, Image, Input, Row, Space } from 'antd'
import {
  ShoppingCartOutlined,
  BellOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

//local
import logo from '../asset/image/logo.png'

import styles from './app.module.scss';

const { Search } = Input

const App = (props) => {
  //components render
  const { renderRouter } = props;

  const onSearch = (value) => {
    console.log(value)
  }

  return (
    <div id={styles.main}>
      <div className={styles.wrapperHeader}>
        <Row justify='space-between' align='middle'>
          <Col>
            <Space size={18}>
              <a>Trang chủ</a>
              <a>Trở thành người bán</a>
              <a>Tải ứng dụng</a>
              <a>Kết nối</a>
            </Space>
          </Col>
          <Col>
            <Space size={18}>
              <Space>
                <a>Thông báo</a>
                <BellOutlined style={{ color: 'white' }} />
              </Space>
              <Space>
                <a>Hỗ trợ</a>
                <QuestionCircleOutlined style={{ color: 'white' }} />
              </Space>
              <a>Đăng ký</a>
              <a>Đăng nhập</a>
            </Space>
          </Col>
        </Row>

        <Row justify='space-between' align='middle' className={styles.searchBarContainer}>
          <Col className={styles.wrapperLogo}>
            <Image src={logo} alt='Logo' preview={false} className={styles.logo} />
            <span className={styles.textLogo}>pt mall</span>
          </Col>

          <Col className={[styles.searchBar, 'search']}>
            <Search
              placeholder='Tìm kiếm'
              onSearch={onSearch}
              allowClear
              className={styles.inputSearch}
              enterButton='Tìm kiếm'
              size='large'
            />
            <Badge count={5}>
              <ShoppingCartOutlined className={styles.iconShoppingCart} />
            </Badge>
          </Col>
        </Row>
      </div>
      <div className={styles.wrapperContent}>
        {renderRouter()}
      </div>
    </div>
  );
}

export default App;
