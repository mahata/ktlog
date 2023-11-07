import { expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Articles from "./Articles";
import { StubArticlesRepository } from "./StubRepos";

const originalFetch = global.fetch;

describe("Articles", () => {
  it("shows 'Articles' header", async () => {
    const stubArticlesRepository = new StubArticlesRepository();
    stubArticlesRepository.getAll.mockResolvedValue([]);
    render(<Articles articlesRepository={stubArticlesRepository} />);

    await act(async () => {
      await stubArticlesRepository.getAll();
    });

    expect(screen.getByText("Articles")).toBeInTheDocument();
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
    render(<Articles articlesRepository={stubArticlesRepository} />);

    expect(await screen.findByText("my title")).toBeInTheDocument();
  });

  afterEach(() => {
    if (vi.isMockFunction(global.fetch)) {
      global.fetch = originalFetch;
    }
  });
});
