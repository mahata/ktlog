import { Article, ArticlesRepository } from "./repository/ArticlesRepository";
import { useEffect, useState } from "react";
import styles from "./Posts.module.scss";

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
    <div className={styles.postsContainer}>
      <h2 className={styles.postsHeader}>Posts</h2>
      <div className={styles.articlesContainer}>
        {articles.map((article) => {
          return (
            <div className={styles.articleTitleContainer} key={article.id}>
              <h2>{article.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
