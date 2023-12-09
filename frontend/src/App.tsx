import "./App.module.scss";
import Articles from "./Articles";
import { ArticlesRepository } from "./repository/ArticlesRepository";
import Header from "./Header";
import EyeCatch from "./EyeCatch";
import { Route, Routes } from "react-router-dom";
import Article from "./Article";
import { useEffect } from "react";
import { UsersRepository } from "./repository/UsersRepository";
import Modal from "./Modal";
import { useAtom } from "jotai";
import { modalAtom } from "./Modal.atoms";

type Props = {
  ktlogDomain: string;
  articlesRepository: ArticlesRepository;
  usersRepository: UsersRepository;
};

export default function App({
  ktlogDomain,
  articlesRepository,
  usersRepository,
}: Props) {
  const [showModal] = useAtom(modalAtom);

  useEffect(() => {
    if (["localhost", "127.0.0.1"].includes(ktlogDomain)) {
      document.title = `dev|${document.title}`;
    }
  }, [ktlogDomain]);

  return (
    <div>
      <Header usersRepository={usersRepository} />
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
      {showModal && <Modal title="Social Login" />}
    </div>
  );
}
