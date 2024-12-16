import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

// Create a client
const queryClient = new QueryClient();

// const router = createBrowserRouter([
//   {
//     path: "/*",
//     element:
//       <QueryClientProvider client={queryClient}>
//         <App />
//       </QueryClientProvider>,
//     basename: process.env.REACT_APP_ROUTER_BASE_NAME || "/",
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <RouterProvider router={router} /> */}
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE_NAME || "/"}>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
