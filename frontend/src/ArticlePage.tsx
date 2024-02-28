import { Article, ArticleRepository } from "./repository/ArticleRepository";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
  articlesRepository: ArticleRepository;
};

export default function ArticlePage({ articlesRepository }: Props) {
  const [article, setArticle] = useState<Article>();
  const { id } = useParams();

  useEffect(() => {
    articlesRepository
      .get(id!)
      .then((article) => setArticle(article))
      .catch((error) => {
        console.error("Failed to fetch articles:", error);
      });
  }, [articlesRepository, id]);

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
