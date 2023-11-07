import { Article, ArticlesRepository } from "./repository/ArticlesRepository";
import { useEffect, useState } from "react";
import styles from "./Articles.module.scss";
import { Link } from "react-router-dom";

type Props = {
  articlesRepository: ArticlesRepository;
};

export default function Articles({ articlesRepository }: Props) {
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
    <div className={styles.articlesContainer}>
      <h2 className={styles.articlesHeader}>Articles</h2>
      <div className={styles.articleContainer}>
        {articles.map((article) => {
          return (
            <div className={styles.articleTitleContainer} key={article.id}>
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
