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
    const articles: any[] = await response.json();

    return Promise.resolve(
      articles.map((article) => ({
        id: article.id,
        title: article.title,
        content: article.content,
      })),
    );
  }
}
