import { Article, ArticleRepository } from "./repository/ArticleRepository";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
  articlesRepository: ArticleRepository;
};

export default function Article({ articlesRepository }: Props) {
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
      <div className="w-4/5">
        <h2 className="text-4xl font-semibold leading-5">{article.title}</h2>
        <div className="leading-4">{article.content}</div>
      </div>
    )
  );
}
