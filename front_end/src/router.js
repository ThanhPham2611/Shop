import React from "react"
import { Route, Switch, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

//screens
import Home from "./screens/Home";
import Login from "./screens/Login";
import PageNotFound from "./screens/PageNotFound";

//local
import { STORAGEKEY } from './service/cookie/index'
import { checkPermission } from "./service/cookie/JWT";


export const routers = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: {
      role: '*',
      isPrivate: false,
      hidden: false,
      child: false,
    },
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      role: '*',
      isPrivate: false,
      hidden: false,
      child: false,
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
      render={(prop) => cookies[STORAGEKEY.ACCESS_TOKEN] ?
        (<Components {...prop} />) :
        (<Redirect
          to={{
            pathname: 'Login',
            state: { redirect_url: prop.location },
          }}
        />)
      }
    />
  );
};

const WhiteListRoute = (props) => {
  const whiteList = ['/login', '/'];
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN]);
  const isWhiteList = (path) =>
    !cookies[STORAGEKEY.ACCESS_TOKEN] && whiteList.indexOf(path) >= 0;

  return (
    <Route
      path={props.path}
      exact
      render={(prop) =>
        isWhiteList(props.path) ? (
          <div>{React.createElement(props.component, prop)}</div>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}

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
  })
  return arr;
}

const routes = () => {
  const whiteList = ["/login", '/'];
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