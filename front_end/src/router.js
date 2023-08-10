import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

//screens
import Home from "./screens/Home";
import Login from "./screens/Login";
import PageNotFound from "./screens/PageNotFound";

//local
import { STORAGEKEY } from "./service/cookie/index";
import { checkPermission } from "./service/cookie/JWT";
import DetailProduct from "./screens/DetailProduct";
import Register from "./screens/Register";
import VerifyRegister from "./screens/VerifyRegister";
import ForgotScreen from "./screens/Forgot";
import LayoutMyAccout from "./screens/MyAccount";
import InfoScreen from "./screens/Info";
import PaymentScreen from "./screens/MyAccount/Payment";

export const routers = [
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: {
      role: "*",
      isPrivate: false,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Home",
    path: "/home",
    component: Home,
    meta: {
      role: "*",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      role: "*",
      isPrivate: false,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
    meta: {
      role: "*",
      isPrivate: false,
      hidden: false,
      child: false,
    },
  },
  {
    name: "VerifyRegister",
    path: "/verify_register",
    component: VerifyRegister,
    meta: {
      role: "*",
      isPrivate: false,
      hidden: false,
      child: false,
    },
  },
  {
    name: 'Create Info User',
    path: '/create_info',
    component: InfoScreen,
    meta: {
      role: '*',
      isPrivate: false,
      hidden: false,
      child: false
    }
  },
  {
    name: "Detail Product",
    path: "/detail/:id",
    component: DetailProduct,
    meta: {
      role: "*",
      isPrivate: false,
      hidden: false,
      child: false,
    },
  },
  {
    name: 'Forgot Password',
    path: '/forgot_password',
    component: ForgotScreen,
    meta: {
      role: '*',
      isPrivate: false,
      hidden: false,
      child: false,
    },
  },
  {
    name: 'Profile',
    path: '/user/account/profile',
    component: LayoutMyAccout,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'BankInfo',
    path: '/user/account/payment',
    component: LayoutMyAccout,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  }
];

const PrivateRouter = (props) => {
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN]);
  const Components = props.component;
  return (
    <Route
      path={props.path}
      exact
      render={(prop) =>
        cookies[STORAGEKEY.ACCESS_TOKEN] ? (
          <Components {...prop} />
        ) : (
          <Redirect
            to={{
              pathname: "Login",
              state: { redirect_url: prop.location },
            }}
          />
        )
      }
    />
  );
};

const WhiteListRoute = (props) => {
  const whiteList = ["/login", "/register", "/", "/detail/:id", '/verify_register', '/forgot_password'];
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN]);
  const isWhiteList = (path) =>
    !cookies[STORAGEKEY.ACCESS_TOKEN] && whiteList.indexOf(path) >= 0;

  console.log('isWhiteList', isWhiteList(props.path))
  return (
    <Route
      path={props.path}
      exact
      render={(prop) =>
        <div>{React.createElement(props.component, prop)}</div>
      }
    />
  );
};

const renderRouter = (routers) => {
  let arr = [];

  routers.forEach((route) => {
    const tmpRoute = route.meta.isPrivate ? (
      <PrivateRouter
        exact
        path={route.path}
        component={route.component}
        key={route.name}
      />
    ) : (
      <WhiteListRoute
        exact
        path={route.path}
        component={route.component}
        key={route.name}
      />
    );
    if (checkPermission(route.meta.role)) {
      arr.push(tmpRoute);
    }
    if (route.children) {
      arr = arr.concat(renderRouter(route.children));
    }
  });
  return arr;
};

const routes = () => {
  const whiteList = ["/login", "/register", "/", "/detail:id", '/verify_register', '/forgot_password'];
  const path = window.location.pathname;
  const isWhiteList = whiteList.includes(path);
  return (
    <div className={`main-content ${isWhiteList ? "whitelist" : ""}`}>
      <Switch>
        {renderRouter(routers).map((render) => render)}
        <PrivateRouter path="/test/:id" />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default routes;
