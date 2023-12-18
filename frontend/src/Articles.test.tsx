import { expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Articles from "./Articles";
import { StubArticlesRepository } from "./StubRepos";
import { MemoryRouter } from "react-router-dom";

describe("Articles", () => {
  it("shows 'Articles' header", async () => {
    const stubArticlesRepository = new StubArticlesRepository();
    stubArticlesRepository.getAll.mockResolvedValue([]);
    render(<Articles articleRepository={stubArticlesRepository} />, {
      wrapper: MemoryRouter,
    });

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
    render(<Articles articleRepository={stubArticlesRepository} />, {
      wrapper: MemoryRouter,
    });

    const articleLink = (await screen.findByRole("link", {
      name: "my title",
    })) as HTMLAnchorElement;

    expect(articleLink).toBeInTheDocument();
    expect(articleLink.href).toBe(
      window.location.origin + "/articles/d8fec293-97c1-46b7-a1d4-458da3689dcd",
    );
  });
});
