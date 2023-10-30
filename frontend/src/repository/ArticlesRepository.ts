export type Article = {
  id: string;
  title: string;
  content: string;
};

export interface ArticlesRepository {
  getAll(): Promise<Article[]>;
}

export class NetworkArticlesRepository implements ArticlesRepository {
  async getAll() {
    const response = await fetch("/api/v1/articles", { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const articles: Article[] = await response.json();

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      content: article.content,
    }));
  }
}
