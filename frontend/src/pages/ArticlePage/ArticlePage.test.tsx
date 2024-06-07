import ArticlePage from "./ArticlePage";
import { vi, expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { useArticleRepository } from "../../repository/useArticleRepository";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: vi
    .fn()
    .mockReturnValue({ id: "03bcd1f0-34b1-4bb9-93cb-b945e217184b" }),
}));

vi.mock("../../repository/useArticleRepository");

describe("Article", () => {
  it("shows an article", async () => {
    vi.mocked(useArticleRepository).mockReturnValue({
      getAll: vi.fn().mockResolvedValue([]),
      get: vi.fn().mockResolvedValue({
        id: "03bcd1f0-34b1-4bb9-93cb-b945e217184b",
        title: "my title",
        content: "my content",
      }),
    });

    render(<ArticlePage />);

    expect(await screen.findByText("my title")).toBeInTheDocument();
    expect(screen.getByText("my content")).toBeInTheDocument();
    expect(useArticleRepository().get).toBeCalledWith(
      "03bcd1f0-34b1-4bb9-93cb-b945e217184b",
    );
  });
});
