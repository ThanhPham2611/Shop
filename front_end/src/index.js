import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux'

import store from './store'
import App from './layout/App';
import routes from './router'

import "antd/dist/reset.css";
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

const browserHistory = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <App renderRouter={routes} />
      </Router>
    </Provider>
  </CookiesProvider>
);
