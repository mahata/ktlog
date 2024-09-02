import { ArticleForm } from "@/component/Form/ArticleForm";
import { render, screen } from "@testing-library/react";

describe("ArticleForm", () => {
	it("renders fields and submit button", () => {
		render(<ArticleForm />);

		expect(screen.getByLabelText("Title")).toBeVisible();
		expect(screen.getByLabelText("Content")).toBeVisible();
		expect(
			screen.getByRole("button", { name: "Post this article" }),
		).toBeVisible();
	});
});
