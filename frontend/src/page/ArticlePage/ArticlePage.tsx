import { EyeCatch } from "@/component/EyeCatch/EyeCatch"
import { useArticleRepository } from "@/repository/useArticleRepository"
import type { Article } from "@/type/Article"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const ArticlePage = () => {
  const [article, setArticle] = useState<Article>()
  const { id } = useParams()
  const { get: getArticle } = useArticleRepository()

  useEffect(() => {
    // biome-ignore lint/style/noNonNullAssertion: "id" is always there because of a React Router config
    getArticle(id!)
      .then((article) => setArticle(article))
      .catch((error) => {
        console.error("Failed to fetch articles:", error)
      })
  }, [getArticle, id])

  return (
    article && (
      <>
        <EyeCatch />
        <div className="flex flex-col items-center">
          <div className="w-4/5">
            <h2 className="my-2 text-4xl font-semibold">{article.title}</h2>
            <div className="my-2 leading-4">{article.content}</div>
          </div>
        </div>
      </>
    )
  )
}
