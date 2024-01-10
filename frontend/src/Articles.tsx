import { Article, ArticleRepository } from "./repository/ArticleRepository";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Props = {
  articleRepository: ArticleRepository;
};

export default function Articles({ articleRepository }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const { uname } = useParams();

  useEffect(() => {
    const articlesPromise = uname
      ? articleRepository.getAllByUname(uname)
      : articleRepository.getAll();

    articlesPromise
      .then((articles) => setArticles(articles))
      .catch((error) => {
        console.error("Failed to fetch articles:", error);
      });
  }, [uname, articleRepository]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-semibold leading-5">Articles</h2>
      <div className="w-4/5">
        {articles.map((article) => {
          return (
            <div
              className="my-6 justify-start text-2xl font-medium leading-4"
              key={article.id}
            >
              <h2>
                <Link to={`/articles/${article.id}`}>{article.title}</Link>
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
