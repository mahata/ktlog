export type Article = {
  id: string;
  title: string;
  content: string;
};

export interface ArticleRepository {
  getAll(): Promise<Article[]>;
  getAllByUname(uname: string): Promise<Article[]>;
  get(uuid: string): Promise<Article>;
}

export class NetworkArticleRepository implements ArticleRepository {
  async getAll(): Promise<Article[]> {
    const response = await fetch("/api/v1/articles", { method: "GET" });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    return response.json();
  }

  async getAllByUname(uname: string): Promise<Article[]> {
    const response = await fetch(`/api/v1/users/${uname}/articles`, {
      method: "GET",
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    return response.json();
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
