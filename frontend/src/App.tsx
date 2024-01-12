import Articles from "./Articles";
import { ArticleRepository } from "./repository/ArticleRepository";
import Header from "./Header";
import EyeCatch from "./EyeCatch";
import { Route, Routes } from "react-router-dom";
import Article from "./Article";
import { useEffect } from "react";
import { UserRepository } from "./repository/UserRepository";
import Modal from "./Modal";
import { useAtom } from "jotai";
import { modalAtom } from "./Modal.atoms";
import SignUp from "./SignUp";
import Post from "./Post";

type Props = {
  ktlogDomain: string;
  articleRepository: ArticleRepository;
  userRepository: UserRepository;
};

export default function App({
  ktlogDomain,
  articleRepository,
  userRepository,
}: Props) {
  const [showModal] = useAtom(modalAtom);

  useEffect(() => {
    if (["localhost", "127.0.0.1"].includes(ktlogDomain)) {
      document.title = `dev|${document.title}`;
    }
  }, [ktlogDomain]);

  return (
    <div>
      <Header userRepository={userRepository} />
      <EyeCatch />
      <Routes>
        <Route
          path="/"
          element={<Articles articleRepository={articleRepository} />}
        />
        <Route
          path="/u/:uname"
          element={<Articles articleRepository={articleRepository} />}
        />
        <Route
          path="/articles/:id"
          element={<Article articlesRepository={articleRepository} />}
        />
        <Route
          path="/signup"
          element={<SignUp userRepository={userRepository} />}
        />
        <Route path="/post" element={<Post />} />
      </Routes>
      {showModal && <Modal title="Social Login" />}
    </div>
  );
}
