import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NetworkUserRepository } from "./repository/UserRepository";
import { Provider } from "jotai";

const networkUsersRepo = new NetworkUserRepository();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App userRepository={networkUsersRepo} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
