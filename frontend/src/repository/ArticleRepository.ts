import { HttpError } from "../HttpError";
import { CsrfTokenManager } from "../CsrfTokenManager";

export type Article = {
  id: string;
  title: string;
  content: string;
};

export interface ArticleRepository {
  getAll(): Promise<Article[]>;
  getAllByUname(uname: string): Promise<Article[]>;
  get(uuid: string): Promise<Article>;
  save(article: Article): Promise<void>;
}

export class NetworkArticleRepository implements ArticleRepository {
  private csrfTokenManager = new CsrfTokenManager();

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

  async save(article: Article): Promise<void> {
    const request = async () => {
      const csrfToken = await this.csrfTokenManager.getToken();

      return fetch("/api/v1/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(article),
      });
    };
    let response = await request();

    if (response.status === 403) {
      // It's highly likely that the CSRF token got invalidated
      await this.csrfTokenManager.fetchNewToken();
      response = await request();
    }

    if (!response.ok) {
      const text = await response.text();
      throw new HttpError(
        response.status,
        `HTTP error! status: ${response.status}, body: ${text}`,
      );
    }
  }
}
