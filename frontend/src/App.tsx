import TopPage from "./page/TopPage/TopPage";
import Header from "./component/Header/Header";
import EyeCatch from "./component/EyeCatch/EyeCatch";
import {Route, Routes} from "react-router-dom";
import ArticlePage from "./page/ArticlePage/ArticlePage";
import LoginModal from "./component/Modal/LoginModal";
import Post from "./Post";
import Toast from "./component/Toast/Toast";

export default function App() {

  if (
    ["localhost", "127.0.0.1"].includes(window.location.hostname) &&
    !document.title.startsWith("dev|")
  ) {
    document.title = `dev|${document.title}`;
  }

  return (
    <div>
      <Header />
      <EyeCatch />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/post" element={<Post />} />
      </Routes>
      <Toast />
      <LoginModal title="Login to ktlog" />
    </div>
  );
}
