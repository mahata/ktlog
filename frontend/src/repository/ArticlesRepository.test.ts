import { vi } from "vitest";
import { NetworkArticlesRepository } from "./ArticlesRepository";

const originalFetch = global.fetch;

describe("ArticlesRepository", () => {
  it("getAll() returns data of Article[]", async () => {
    expect(1).toBe(1);
    const stubResponse = [
      {
        id: "9994b37d-1247-4aef-a95d-dfd6a856fbec",
        title: "my title",
        content: "my content",
      },
    ];

    const mockedFetch = vi.fn();
    mockedFetch.mockResolvedValue(new Response(JSON.stringify(stubResponse)));
    global.fetch = mockedFetch;

    const articlesRepository = new NetworkArticlesRepository();
    const response = await articlesRepository.getAll();

    expect(mockedFetch).toHaveBeenCalledWith("/api/v1/articles", {
      method: "GET",
    });
    expect(response.length).toBe(1);
    expect(response[0].id).toBe("9994b37d-1247-4aef-a95d-dfd6a856fbec");
    expect(response[0].title).toBe("my title");
    expect(response[0].content).toBe("my content");
  });

  afterEach(() => {
    if (vi.isMockFunction(global.fetch)) {
      global.fetch = originalFetch;
    }
  });
});
