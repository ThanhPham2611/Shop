import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch } from "react-redux";

import Cart from "../components/cart";
import { STORAGEKEY, getCookie } from "../service/cookie";
import Header from "./components/header";
import { myProfile } from "../store/modules/userInfoSlice";
import ChatComponent from "../components/chat";

import styles from "./app.module.scss";

const App = (props) => {
  //components render
  const { renderRouter } = props;
  const { pathname } = useLocation();
  const getToken = getCookie(STORAGEKEY.ACCESS_TOKEN);
  const dispatch = useDispatch();
  moment.locale('vi');

  useEffect(() => {
    if (getToken) {
      dispatch(myProfile());
    }
  }, [getToken, pathname]);

  const whiteList = ['/login', '/register', '/verify_register', '/forgot_password', '/create_info'];

  return (whiteList.includes(pathname)) ? (
    <div>
      {renderRouter()}
      <ToastContainer />
    </div>
  ) : (
    <div id={styles.main}>
      <Header />
      <Cart />
      <div className={styles.wrapperContent}>{renderRouter()}</div>
      <ToastContainer />
      <ChatComponent />
    </div>
  );
};

export default App;
