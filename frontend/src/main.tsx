import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "reset-css";
import { BrowserRouter } from "react-router-dom";
import { NetworkArticlesRepository } from "./repository/ArticlesRepository";

const networkArticlesRepo = new NetworkArticlesRepository();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App articlesRepository={networkArticlesRepo} />
    </BrowserRouter>
  </React.StrictMode>,
);
