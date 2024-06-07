import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TopPage from "./TopPage";
import { MemoryRouter } from "react-router-dom";
import { useArticleRepository } from "../../repository/useArticleRepository";
import { makeArticleFixture } from "../../fixture/makeArticleFixture";

vi.mock("../../repository/useArticleRepository");

describe("TopPage", () => {
  it("shows 'TopPage' header", async () => {
    vi.mocked(useArticleRepository).mockReturnValue({
      getAll: vi.fn().mockResolvedValue([]),
      get: vi.fn(),
    });
    render(<TopPage />);

    expect(await screen.findByText("Articles")).toBeVisible();
  });

  it("shows all articles", async () => {
    const articleId = "00000000-0000-0000-0000-000000000000";
    const stubArticle = makeArticleFixture({
      id: articleId,
    });

    vi.mocked(useArticleRepository).mockReturnValue({
      getAll: vi.fn().mockResolvedValue([stubArticle]),
      get: vi.fn(),
    });

    render(<TopPage />, {
      wrapper: MemoryRouter,
    });

    const articleLink = (await screen.findByRole("link", {
      name: stubArticle.title,
    })) as HTMLAnchorElement;

    expect(articleLink).toBeVisible();
    expect(articleLink.href).toBe(
      window.location.origin + `/articles/${articleId}`,
    );

    expect(screen.getByText(stubArticle.content)).toBeVisible();
  });

  it("strips article contents when it's more than 200 chars", async () => {
    vi.mocked(useArticleRepository).mockReturnValue({
      getAll: vi.fn().mockResolvedValue([
        makeArticleFixture({
          id: "00000000-0000-0000-0000-000000000000",
          content: "x".repeat(200),
        }),
        makeArticleFixture({
          id: "00000000-0000-0000-0000-000000000001",
          content: "y".repeat(201),
        }),
      ]),
      get: vi.fn(),
    });

    render(<TopPage />, {
      wrapper: MemoryRouter,
    });

    await screen.findByText("x".repeat(200));
    expect(screen.getByText("y".repeat(200) + "..."));
  });
});
