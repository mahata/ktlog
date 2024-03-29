import ArticlesPage from "./ArticlesPage";
import { ArticleRepository } from "./repository/ArticleRepository";
import Header from "./Header";
import EyeCatch from "./EyeCatch";
import { Route, Routes } from "react-router-dom";
import ArticlePage from "./ArticlePage";
import { useEffect } from "react";
import { UserRepository } from "./repository/UserRepository";
import Modal from "./Modal";
import { useAtom } from "jotai";
import { modalAtom } from "./Modal.atoms";
import SignUpPage from "./SignUpPage";
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
          element={<ArticlesPage articleRepository={articleRepository} />}
        />
        <Route
          path="/u/:uname"
          element={<ArticlesPage articleRepository={articleRepository} />}
        />
        <Route
          path="/articles/:id"
          element={<ArticlePage articlesRepository={articleRepository} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage userRepository={userRepository} />}
        />
        <Route path="/post" element={<Post />} />
      </Routes>
      {showModal && <Modal title="Social Login" />}
    </div>
  );
}
