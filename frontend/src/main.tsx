import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "reset-css";
import { BrowserRouter } from "react-router-dom";
import { NetworkArticlesRepository } from "./repository/ArticlesRepository";
import { NetworkUsersRepository } from "./repository/UsersRepository";
import { Provider } from "jotai";

const networkArticlesRepo = new NetworkArticlesRepository();
const networkUsersRepo = new NetworkUsersRepository();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App
          ktlogDomain={window.location.hostname}
          articlesRepository={networkArticlesRepo}
          usersRepository={networkUsersRepo}
        />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
