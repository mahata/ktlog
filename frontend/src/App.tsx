import "./App.module.scss";
import Articles from "./Articles";
import { ArticlesRepository } from "./repository/ArticlesRepository";
import Header from "./Header";
import EyeCatch from "./EyeCatch";
import { Route, Routes } from "react-router-dom";
import Article from "./Article";
import { useEffect } from "react";

type Props = {
  ktlogDomain: string;
  articlesRepository: ArticlesRepository;
};

export default function App({ ktlogDomain, articlesRepository }: Props) {
  useEffect(() => {
    if (["localhost", "127.0.0.1"].includes(ktlogDomain)) {
      document.title = `dev|${document.title}`;
    }
  }, [ktlogDomain]);

  return (
    <div>
      <Header />
      <EyeCatch />
      <Routes>
        <Route
          path="/"
          element={<Articles articlesRepository={articlesRepository} />}
        />
        <Route
          path="/articles/:id"
          element={<Article articlesRepository={articlesRepository} />}
        />
      </Routes>
    </div>
  );
}
