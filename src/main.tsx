import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.tsx'
import React from 'react';
import ConfigProvider from './context/config-provider.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  import.meta.env.MODE === 'production' ? (
    <React.StrictMode>
      <ConfigProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </React.StrictMode>
  ) : (
    <ConfigProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  ),
);
