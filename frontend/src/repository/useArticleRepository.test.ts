import { renderHook } from "@testing-library/react";
import { useArticleRepository } from "./useArticleRepository";

const originalFetch = globalThis.fetch;

const article = {
	id: "9994b37d-1247-4aef-a95d-dfd6a856fbec",
	title: "my title",
	content: "my content",
};

describe("useArticleRepository", () => {
	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	describe("getAll", () => {
		it("fetches all articles", async () => {
			globalThis.fetch = vi
				.fn()
				.mockReturnValueOnce(new Response(JSON.stringify([article])));

			const { result } = renderHook(useArticleRepository);

			const response = await result.current.getAll();
			expect(response).toEqual([article]);

			expect(globalThis.fetch).toHaveBeenCalledWith("/api/v1/articles", {
				method: "GET",
			});
		});
	});

	describe("get", () => {
		it("fetches an article of a specified id", async () => {
			globalThis.fetch = vi
				.fn()
				.mockReturnValueOnce(new Response(JSON.stringify(article)));

			const { result } = renderHook(useArticleRepository);

			const response = await result.current.get(article.id);
			expect(response).toEqual(article);

			expect(globalThis.fetch).toHaveBeenCalledWith(
				`/api/v1/articles/${article.id}`,
				{
					method: "GET",
				},
			);
		});
	});
});
