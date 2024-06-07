import TopPage from "./page/TopPage/TopPage";
import Header from "./component/Header/Header";
import EyeCatch from "./component/EyeCatch/EyeCatch";
import { Route, Routes } from "react-router-dom";
import ArticlePage from "./page/ArticlePage/ArticlePage";
import { UserRepository } from "./repository/UserRepository";
import LoginModal from "./component/Modal/LoginModal";
import { useAtom } from "jotai";
import { loginModalAtom } from "./component/Modal/LoginModal.atoms";
import Post from "./Post";

type Props = {
  userRepository: UserRepository;
};

export default function App({ userRepository }: Props) {
  const [showLoginModal] = useAtom(loginModalAtom);

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
        <Route path="/" element={<TopPage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/post" element={<Post />} />
      </Routes>
      {showLoginModal && <LoginModal title="Login to ktlog" />}
    </div>
  );
}
