import React from 'react';
import { Badge, Col, Divider, Image, Input, Row, Space } from 'antd'
import {
  ShoppingCartOutlined,
  BellOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom'


//local
import logo from '../asset/image/logo.png'

import styles from './app.module.scss';

const { Search } = Input

const App = (props) => {
  //components render
  const { renderRouter } = props;

  const { pathname } = useLocation();

  console.log('pathName::>>', pathname)

  const onSearch = (value) => {
    console.log(value)
  }

  return pathname === '/login' ? renderRouter() : (
    <div id={styles.main}>
      <div className={styles.wrapperHeader}>
        <Row justify='space-between' align='middle'>
          <Col>
            <Space size={5}>
              <a>Trang chủ</a>
              <Divider type="vertical" style={{ borderColor: 'hsla(0,0%,100%,.22)' }} />
              <a>Trở thành người bán</a>
              <Divider type="vertical" style={{ borderColor: 'hsla(0,0%,100%,.22)' }} />
              <a>Tải ứng dụng</a>
              <Divider type="vertical" style={{ borderColor: 'hsla(0,0%,100%,.22)' }} />
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
              <a href='/login'>Đăng nhập</a>
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
