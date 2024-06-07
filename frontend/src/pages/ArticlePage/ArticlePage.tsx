import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useArticleRepository } from "../../repository/useArticleRepository";
import { Article } from "../../types/Article";

export default function ArticlePage() {
  const [article, setArticle] = useState<Article>();
  const { id } = useParams();
  const { get: getArticle } = useArticleRepository();

  useEffect(() => {
    getArticle(id!)
      .then((article) => setArticle(article))
      .catch((error) => {
        console.error("Failed to fetch articles:", error);
      });
  }, [getArticle, id]);

  return (
    article && (
      <div className="flex flex-col items-center">
        <div className="w-4/5">
          <h2 className="my-2 text-4xl font-semibold">{article.title}</h2>
          <div className="my-2 leading-4">{article.content}</div>
        </div>
      </div>
    )
  );
}
