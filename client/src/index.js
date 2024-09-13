import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00ffff",
          colorBorder: "#ff00ff",
          colorText: "#ffffff",
          colorBgContainer: "#0a0a0a",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);

reportWebVitals();