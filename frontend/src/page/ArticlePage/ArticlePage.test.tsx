import { makeArticleFixture } from "@/fixture/makeArticleFixture";
import { useArticleRepository } from "@/repository/useArticleRepository";
import { _useArticleRepository } from "@/test-helper/__mocks__/useArticleRepository";
import { render, screen } from "@testing-library/react";
import ArticlePage from "./ArticlePage";

vi.mock("react-router-dom", async () => ({
	...(await vi.importActual("react-router-dom")),
	useParams: vi
		.fn()
		.mockReturnValue({ id: "00000000-0000-0000-0000-000000000000" }),
}));

vi.mock(
	"@/repository/useArticleRepository",
	() => import("@/test-helper/__mocks__/useArticleRepository"),
);

describe("Article", () => {
	const originalGetMock = _useArticleRepository.getMock;

	afterEach(() => {
		_useArticleRepository.getMock = originalGetMock;
	});

	it("shows an article", async () => {
		const stubArticle = makeArticleFixture({
			id: "00000000-0000-0000-0000-000000000000",
		});

		_useArticleRepository.getMock = vi.fn().mockResolvedValueOnce(stubArticle);
		render(<ArticlePage />);

		expect(await screen.findByText(stubArticle.title)).toBeVisible();
		expect(screen.getByText(stubArticle.content)).toBeVisible();
		expect(useArticleRepository().get).toBeCalledWith(
			"00000000-0000-0000-0000-000000000000",
		);
	});
});
