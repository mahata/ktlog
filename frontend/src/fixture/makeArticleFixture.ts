import type { Article } from "../type/Article";
import { makeFixture } from "./makeFixture";

export const makeArticleFixture = (overrides?: Partial<Article>): Article => {
	return makeFixture(
		{
			id: "00000000-0000-0000-0000-000000000000",
			title: "default title created by makeArticleFixture",
			content: "default content created by makeArticleFixture",
		},
		overrides,
	);
};
