import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TopPage from "./TopPage";
import { MemoryRouter } from "react-router-dom";
import { useArticleRepository } from "../../repository/useArticleRepository";

vi.mock("../../repository/useArticleRepository");

describe("TopPage", () => {
  it("shows 'TopPage' header", async () => {
    vi.mocked(useArticleRepository).mockReturnValue({
      getAll: vi.fn().mockResolvedValue([]),
      get: vi.fn(),
    });
    render(<TopPage />);

    expect(await screen.findByText("Articles")).toBeInTheDocument();
  });

  it("shows all articles", async () => {
    vi.mocked(useArticleRepository).mockReturnValue({
      getAll: vi.fn().mockResolvedValue([
        {
          id: "d8fec293-97c1-46b7-a1d4-458da3689dcd",
          title: "my title",
          content: "my content",
        },
      ]),
      get: vi.fn(),
    });

    render(<TopPage />, {
      wrapper: MemoryRouter,
    });

    const articleLink = (await screen.findByRole("link", {
      name: "my title",
    })) as HTMLAnchorElement;

    expect(articleLink).toBeInTheDocument();
    expect(articleLink.href).toBe(
      window.location.origin + "/articles/d8fec293-97c1-46b7-a1d4-458da3689dcd",
    );

    expect(screen.getByText("my content")).toBeInTheDocument();
  });

  it("strips article contents when it's more than 200 chars", async () => {
    vi.mocked(useArticleRepository).mockReturnValue({
      getAll: vi.fn().mockResolvedValue([
        {
          id: "d8fec293-97c1-46b7-a1d4-458da3689dcd",
          title: "my title 1",
          content: "x".repeat(200),
        },
        {
          id: "2da288aa-aabd-4555-befe-30c71d1ee559",
          title: "my title 2",
          content: "y".repeat(201),
        },
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
