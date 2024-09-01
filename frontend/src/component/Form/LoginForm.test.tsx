import { LoginForm } from "@/component/Form/LoginForm";
import { render, screen } from "@testing-library/react";

describe("LoginForm", () => {
	it("shows fields and submit button", () => {
		render(<LoginForm closeModal={() => {}} />);

		expect(screen.getByLabelText("email")).toBeVisible();
		expect(screen.getByLabelText("password")).toBeVisible();
		expect(
			screen.getByRole("button", { name: "Send login request" }),
		).toBeVisible();
	});
});
