import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Post from "./Post";

describe("Post", () => {
	it("shows HTML form to submit a new article", () => {
		render(<Post />);

		expect(screen.getByLabelText("title")).toBeInTheDocument();
		expect(screen.getByLabelText("content")).toBeInTheDocument();

		const postButton: HTMLButtonElement = screen.getByRole("button", {
			name: "Post!",
		});
		expect(postButton).toBeDisabled();
	});

	it("enables the submit button when both title and content are filled", async () => {
		render(<Post />);

		const titleInput = screen.getByLabelText("title") as HTMLInputElement;
		const contentDiv = screen.getByLabelText("content") as HTMLDivElement;

		await userEvent.type(titleInput, "my title");

		act(() => {
			contentDiv.innerText = "my content";
			contentDiv.dispatchEvent(new Event("input", { bubbles: true }));
		});

		const postButton: HTMLButtonElement = screen.getByRole("button", {
			name: "Post!",
		});

		await waitFor(() => {
			expect(postButton).toBeEnabled();
		});
	});
});
