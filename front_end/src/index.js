import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from './layout/App';
import routes from './router'

import "antd/dist/reset.css";
import './index.scss';

const browserHistory = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <Router history={browserHistory}>
      <App renderRouter={routes} />
    </Router>
  </CookiesProvider>
);
