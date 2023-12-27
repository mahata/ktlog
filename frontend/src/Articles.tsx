import { Article, ArticleRepository } from "./repository/ArticleRepository";
import { useEffect, useState } from "react";
import styles from "./Articles.module.scss";
import { Link } from "react-router-dom";

type Props = {
  articleRepository: ArticleRepository;
};

export default function Articles({ articleRepository }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  // const { uname } = useParams();

  useEffect(() => {
    articleRepository
      .getAll()
      .then((articles) => setArticles(articles))
      .catch((error) => {
        console.error("Failed to fetch articles:", error);
      });
  }, [articleRepository]);

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
