import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import Cart from "../components/cart";
import { STORAGEKEY, getCookie } from "../service/cookie";
import Header from "./components/header";
import { myProfile } from "../store/modules/userInfoSlice";

import styles from "./app.module.scss";
import { useDispatch } from "react-redux";

const App = (props) => {
  //components render
  const { renderRouter } = props;
  const { pathname } = useLocation();
  const getToken = getCookie(STORAGEKEY.ACCESS_TOKEN);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getToken) {
      dispatch(myProfile());
    }
  }, [getToken, pathname])

  const whiteList = ['/login', '/register', '/verify_register'];

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
    </div>
  );
};

export default App;
