import { Modal, type ModalRef } from "@/component/Modal/Modal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";

describe("Modal", () => {
	const originalShowModal = HTMLDialogElement.prototype.showModal;

	beforeEach(() => {
		HTMLDialogElement.prototype.showModal = vi.fn();
	});

	afterEach(() => {
		HTMLDialogElement.prototype.showModal = originalShowModal;
	});

	it("Modal is not visible by default", () => {
		render(
			<Modal>
				<div data-testid="modal" />
			</Modal>,
		);

		expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
		expect(screen.getByTestId("modal")).not.toBeVisible();
	});

	it("show modal", async () => {
		render(<ParentComponent />);

		await userEvent.click(screen.getByTestId("show-button"));

		expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
	});
});

const ParentComponent = () => {
	const dialogRef = useRef<ModalRef>(null);

	return (
		<>
			<button
				type="button"
				data-testid="show-button"
				onClick={() => dialogRef.current?.showModal()}
			/>

			<Modal ref={dialogRef}>
				<button
					type="button"
					data-testid="close-button"
					onClick={() => dialogRef.current?.close()}
				/>
				<div data-testid="modal" />
			</Modal>
		</>
	);
};
