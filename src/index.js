import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/paul-delivery">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
