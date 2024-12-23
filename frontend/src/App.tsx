import { Post } from "@/Post"
import { Toast } from "@/component/Toast/Toast"
import { ArticlePage } from "@/page/ArticlePage/ArticlePage"
import { NewArticlePage } from "@/page/NewArticlePage/NewArticlePage"
import { Route, Routes } from "react-router"
import { LoginPage } from "./page/LoginPage/LoginPage"
import { TopPage } from "./page/TopPage/TopPage"

export const App = () => {
  if (["ktlog.local", "localhost", "127.0.0.1"].includes(window.location.hostname) && !document.title.startsWith("dev|")) {
    document.title = `dev|${document.title}`
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/articles/new" element={<NewArticlePage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/post" element={<Post />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toast />
    </div>
  )
}
