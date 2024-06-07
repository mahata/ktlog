import { useArticleRepository } from "./useArticleRepository";
import { renderHook } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";

const originalFetch = globalThis.fetch;

const article = {
  id: "9994b37d-1247-4aef-a95d-dfd6a856fbec",
  title: "my title",
  content: "my content",
};

describe("getAll", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("fetches all articles", async () => {
    const stubResponse = [article];

    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(stubResponse)));

    const { result } = renderHook(useArticleRepository);

    const response = await result.current.getAll();
    expect(response).toEqual([article]);

    expect(globalThis.fetch).toHaveBeenCalledWith("/api/v1/articles", {
      method: "GET",
    });
  });
});

describe("get", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("fetches an article of a specified id", async () => {
    const stubResponse = article;

    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(stubResponse)));

    const { result } = renderHook(useArticleRepository);

    const response = await result.current.get(article.id);
    expect(response).toEqual(article);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `/api/v1/articles/${article.id}`,
      {
        method: "GET",
      },
    );
  });
});
