import {
  Article,
  ArticlesRepository,
} from "./repository/ArticlesRepository.ts";
import { useEffect, useState } from "react";

type Props = {
  articlesRepository: ArticlesRepository;
};

export default function Posts({ articlesRepository }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    articlesRepository
      .getAll()
      .then((articles) => setArticles(articles))
      .catch((error) => {
        console.error("Failed to fetch articles:", error);
      });
  }, [articlesRepository]);

  return (
    <>
      <h2>Posts</h2>
      <div>
        {articles.map((article) => {
          return (
            <div key={article.id}>
              <h2>{article.title}</h2>
              <article>{article.content}</article>
            </div>
          );
        })}
      </div>
    </>
  );
}
