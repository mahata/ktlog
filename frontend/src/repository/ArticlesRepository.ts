export type Article = {
  id: string;
  title: string;
  content: string;
};

export interface ArticlesRepository {
  getAll(): Promise<Article[]>;
  get(uuid: string): Promise<Article>;
}

export class NetworkArticlesRepository implements ArticlesRepository {
  async getAll(): Promise<Article[]> {
    const response = await fetch("/api/v1/articles", { method: "GET" });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    const articles: Article[] = await response.json();

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      content: article.content,
    }));
  }

  async get(uuid: string): Promise<Article> {
    const response = await fetch(`/api/v1/articles/${uuid}`, { method: "GET" });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    return response.json();
  }
}
