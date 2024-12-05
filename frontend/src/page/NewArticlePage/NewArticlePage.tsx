import { useNavigate } from "react-router";

export const NewArticlePage = () => {
  const navigate = useNavigate()

  if (!localStorage.getItem("accessToken")) {
    navigate("/")
  }

  return (
    <div>
      <h1>New Article</h1>
    </div>
  )
}
