import { useEffect } from "react"
import { useNavigate } from "react-router"

export const NewArticlePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/")
    }
  }, [navigate])

  return (
    <div>
      <h1>New Article</h1>
    </div>
  )
}
