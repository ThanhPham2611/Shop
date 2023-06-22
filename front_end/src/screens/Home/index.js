import React from "react";
import { Spin } from "antd";

import Advertisement from "./components/Advertisement";
import Category from "./components/Category";
import Policy from "./components/Policy";

const Home = () => {

  return (
    <Spin spinning={false} tip='Đang tải....' size='large'>
      <Advertisement />
      <Policy />
      <Category />
    </Spin>
  )
}

export default Home