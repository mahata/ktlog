import "./App.module.scss";
import Articles from "./Articles";
import { ArticlesRepository } from "./repository/ArticlesRepository";
import Header from "./Header";
import EyeCatch from "./EyeCatch";
import { Route, Routes } from "react-router-dom";
import Article from "./Article";

type Props = {
  articlesRepository: ArticlesRepository;
};

export default function App({ articlesRepository }: Props) {
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
