import LoginModal from "./LoginModal";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useAuthRepository } from "../../repository/useAuthRepository";

vi.mock("../../repository/useAuthRepository");

describe("LoginModal", () => {
  beforeEach(() => {
    vi.mocked(useAuthRepository).mockReturnValue({
      auth: vi.fn(),
      getAuthStatus: vi.fn(),
    } satisfies ReturnType<typeof useAuthRepository>);
  });

  it("restricts page scrolling when it's active", () => {
    expect(window.document.body.style.overflowY).not.toBe("hidden");

    render(<LoginModal title="DOES NOT MATTER" />);

    expect(window.document.body.style.overflowY).toBe("hidden");
  });

  it("allows page scrolling when it's inactive", () => {
    const { unmount } = render(<LoginModal title="DOES NOT MATTER" />);

    unmount();

    expect(window.document.body.style.overflowY).toBe("unset");
  });

  it("shows email and password input fields", () => {
    render(<LoginModal title="DOES NOT MATTER" />);

    const emailField = screen.getByLabelText("email");
    expect(emailField).toHaveAttribute("placeholder", "Please type your email");

    const passwordField = screen.getByLabelText("password");
    expect(passwordField).toHaveAttribute(
      "placeholder",
      "Please type your password",
    );
  });

  it("shows a login button", () => {
    render(<LoginModal title="DOES NOT MATTER" />);

    expect(screen.getByRole("button", { name: "Send" }));
  });

  describe("Login Button", () => {
    it("sends a request when clicked", async () => {
      render(<LoginModal title="DOES NOT MATTER" />);

      await userEvent.type(
        screen.getByLabelText("email"),
        "john-doe@example.com",
      );
      await userEvent.type(screen.getByLabelText("password"), "password");
      await userEvent.click(screen.getByRole("button", { name: "Send" }));

      expect(useAuthRepository().auth).toHaveBeenCalledWith(
        "john-doe@example.com",
        "password",
      );
    });
  });
});
