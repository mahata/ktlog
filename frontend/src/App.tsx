import TopPage from "./pages/TopPage/TopPage";
import { ArticleRepository } from "./repository/ArticleRepository";
import Header from "./Header";
import EyeCatch from "./EyeCatch";
import { Route, Routes } from "react-router-dom";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import { UserRepository } from "./repository/UserRepository";
import LoginModal from "./components/Modal/LoginModal";
import { useAtom } from "jotai";
import { loginModalAtom } from "./components/Modal/LoginModal.atoms";
import Post from "./Post";

type Props = {
  articleRepository: ArticleRepository;
  userRepository: UserRepository;
};

export default function App({
  articleRepository,
  userRepository,
}: Props) {
  const [showModal] = useAtom(loginModalAtom);

  if (
      ["localhost", "127.0.0.1"].includes(window.location.hostname) &&
      !document.title.startsWith("dev|")
  ) {
    document.title = `dev|${document.title}`;
  }

  return (
    <div>
      <Header userRepository={userRepository} />
      <EyeCatch />
      <Routes>
        <Route
          path="/"
          element={<TopPage articleRepository={articleRepository} />}
        />
        <Route
          path="/articles/:id"
          element={<ArticlePage articlesRepository={articleRepository} />}
        />
        <Route path="/post" element={<Post />} />
      </Routes>
      {showModal && <LoginModal title="Login to ktlog" />}
    </div>
  );
}
