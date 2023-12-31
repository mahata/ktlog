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
      <>
        <div>{article.title}</div>
        <div>{article.content}</div>
      </>
    )
  );
}
