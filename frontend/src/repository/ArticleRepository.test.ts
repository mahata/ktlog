import { vi, describe, it, expect, afterEach } from "vitest";
import { NetworkArticleRepository } from "./ArticleRepository";
import { CsrfTokenManager } from "../CsrfTokenManager";

const originalFetch = globalThis.fetch;

describe("ArticlesRepository", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

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

  it("save(article) sends data of Article", async () => {
    const csrfToken = "DOES NOT REALLY MATTER";
    localStorage.setItem(CsrfTokenManager.TOKEN_STORAGE_KEY, csrfToken);

    const mockedFetch = vi.fn();
    mockedFetch.mockResolvedValue(new Response(""));
    globalThis.fetch = mockedFetch;

    const articleRepository = new NetworkArticleRepository();
    await articleRepository.save(article);

    expect(globalThis.fetch).toHaveBeenCalledWith(`/api/v1/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify(article),
    });
  });
});
