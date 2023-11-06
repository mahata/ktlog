import { expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Posts from "./Posts";
import { ArticlesRepository } from "./repository/ArticlesRepository";

class StubArticlesRepository implements ArticlesRepository {
  getAll = vi.fn();
}

const originalFetch = global.fetch;

describe("Posts", () => {
  it("shows 'Posts' header", async () => {
    const stubArticlesRepository = new StubArticlesRepository();
    stubArticlesRepository.getAll.mockResolvedValue([]);
    render(<Posts articlesRepository={stubArticlesRepository} />);

    expect(screen.getByText("Posts")).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
    });
  });

  it("shows articles fetched from the API server", async () => {
    const stubArticlesRepository = new StubArticlesRepository();
    stubArticlesRepository.getAll.mockResolvedValue([
      {
        id: "d8fec293-97c1-46b7-a1d4-458da3689dcd",
        title: "my title",
        content: "this does not matter",
      },
    ]);
    render(<Posts articlesRepository={stubArticlesRepository} />);

    expect(await screen.findByText("my title")).toBeInTheDocument();
  });

  afterEach(() => {
    if (vi.isMockFunction(global.fetch)) {
      global.fetch = originalFetch;
    }
  });
});
