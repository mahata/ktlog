import Article from "./Article";
import { vi, expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { StubArticlesRepository } from "./StubRepos";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: vi
    .fn()
    .mockReturnValue({ id: "03bcd1f0-34b1-4bb9-93cb-b945e217184b" }),
}));

describe("Article", () => {
  it("shows an article", async () => {
    const stubArticleRepository = new StubArticlesRepository();
    stubArticleRepository.get.mockResolvedValue({
      id: "03bcd1f0-34b1-4bb9-93cb-b945e217184b",
      title: "my title",
      content: "my content",
    });

    render(<Article articlesRepository={stubArticleRepository} />);

    expect(await screen.findByText("my title")).toBeInTheDocument();
    expect(screen.getByText("my content")).toBeInTheDocument();
    expect(stubArticleRepository.get).toBeCalledWith(
      "03bcd1f0-34b1-4bb9-93cb-b945e217184b",
    );
  });
});
