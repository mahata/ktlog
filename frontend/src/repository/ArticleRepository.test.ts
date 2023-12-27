import { vi } from "vitest";
import { NetworkArticleRepository } from "./ArticleRepository";

const originalFetch = globalThis.fetch;

describe("ArticlesRepository", () => {
  const article = {
    id: "9994b37d-1247-4aef-a95d-dfd6a856fbec",
    title: "my title",
    content: "my content",
  };

  it("getAll() returns data of Article[]", async () => {
    const stubResponse = [article];

    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(stubResponse)));

    const articlesRepository = new NetworkArticleRepository();
    const response = await articlesRepository.getAll();

    expect(globalThis.fetch).toHaveBeenCalledWith("/api/v1/articles", {
      method: "GET",
    });
    expect(response).toEqual(stubResponse);
  });

  it("getAllByUname(uname) returns data of Article[] written by the user", async () => {
    const stubResponse = [article];

    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(stubResponse)));

    const articlesRepository = new NetworkArticleRepository();
    const response = await articlesRepository.getAllByUname("mahata");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/v1/users/mahata/articles",
      {
        method: "GET",
      },
    );
    expect(response).toEqual(stubResponse);
  });

  it("get(uuid) returns data of Article", async () => {
    const stubResponse = article;

    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(stubResponse)));

    const articlesRepository = new NetworkArticleRepository();
    const response = await articlesRepository.get(article.id);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `/api/v1/articles/${article.id}`,
      {
        method: "GET",
      },
    );
    expect(response).toEqual(stubResponse);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });
});
