import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StoreContext, store as Store } from "./store";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store as any}>
      <StoreContext.Provider value={Store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
