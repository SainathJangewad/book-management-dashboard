import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./store/uiSlice";
import { App as AntdApp } from "antd";
import "antd/dist/reset.css";
import "./styles/global.scss";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AntdApp>
            <App />
          </AntdApp>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

