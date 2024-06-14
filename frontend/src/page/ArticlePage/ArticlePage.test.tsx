import ArticlePage from "./ArticlePage";
import { render, screen } from "@testing-library/react";
import { useArticleRepository } from "../../repository/useArticleRepository";
import { makeArticleFixture } from "../../fixture/makeArticleFixture";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: vi
    .fn()
    .mockReturnValue({ id: "00000000-0000-0000-0000-000000000000" }),
}));

vi.mock("../../repository/useArticleRepository");

describe("Article", () => {
  it("shows an article", async () => {
    const stubArticle = makeArticleFixture({
      id: "00000000-0000-0000-0000-000000000000",
    });

    vi.mocked(useArticleRepository).mockReturnValue({
      getAll: vi.fn().mockResolvedValue([]),
      get: vi.fn().mockResolvedValue(stubArticle),
    });

    render(<ArticlePage />);

    expect(await screen.findByText(stubArticle.title)).toBeVisible();
    expect(screen.getByText(stubArticle.content)).toBeInTheDocument();
    expect(useArticleRepository().get).toBeCalledWith(
      "00000000-0000-0000-0000-000000000000",
    );
  });
});
