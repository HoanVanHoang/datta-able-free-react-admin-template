import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import { createRoot } from 'react-dom/client';

import './services';

import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import { LoadingProvider } from './contexts/LoadingContext';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { DialogProvider } from './contexts/DialogContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ConfigProvider>
      <DialogProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </DialogProvider>
    </ConfigProvider>
  </Provider>
);

reportWebVitals();
