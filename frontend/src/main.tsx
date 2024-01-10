import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "reset-css";
import "./output.css";
import { BrowserRouter } from "react-router-dom";
import { NetworkArticleRepository } from "./repository/ArticleRepository";
import { NetworkUserRepository } from "./repository/UserRepository";
import { Provider } from "jotai";

const networkArticlesRepo = new NetworkArticleRepository();
const networkUsersRepo = new NetworkUserRepository();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App
          ktlogDomain={window.location.hostname}
          articleRepository={networkArticlesRepo}
          userRepository={networkUsersRepo}
        />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
