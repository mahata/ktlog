import { Modal } from "@/component/Modal/Modal";
import { render, screen } from "@testing-library/react";

describe("Modal", () => {
	it("Modal is not visible by default", () => {
		render(
			<Modal>
				<div data-testid="modal" />
			</Modal>,
		);

		expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
		expect(screen.getByTestId("modal")).not.toBeVisible();
	});
});
