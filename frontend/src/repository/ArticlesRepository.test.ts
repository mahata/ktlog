import { vi } from "vitest";
import { NetworkArticlesRepository } from "./ArticlesRepository";

const originalFetch = global.fetch;

describe("ArticlesRepository", () => {
  const article = {
    id: "9994b37d-1247-4aef-a95d-dfd6a856fbec",
    title: "my title",
    content: "my content",
  };

  it("getAll() returns data of Article[]", async () => {
    const stubResponse = [article];

    const mockedFetch = vi.fn();
    mockedFetch.mockResolvedValue(new Response(JSON.stringify(stubResponse)));
    global.fetch = mockedFetch;

    const articlesRepository = new NetworkArticlesRepository();
    const response = await articlesRepository.getAll();

    expect(mockedFetch).toHaveBeenCalledWith("/api/v1/articles", {
      method: "GET",
    });
    expect(response).toEqual(stubResponse);
  });

  it("get(uuid) returns data of Article", async () => {
    const stubResponse = article;

    const mockedFetch = vi.fn();
    mockedFetch.mockResolvedValue(new Response(JSON.stringify(stubResponse)));
    global.fetch = mockedFetch;

    const articlesRepository = new NetworkArticlesRepository();
    const response = await articlesRepository.get(article.id);

    expect(mockedFetch).toHaveBeenCalledWith(`/api/v1/articles/${article.id}`, {
      method: "GET",
    });
    expect(response).toEqual(stubResponse);
  });

  afterEach(() => {
    if (vi.isMockFunction(global.fetch)) {
      global.fetch = originalFetch;
    }
  });
});
