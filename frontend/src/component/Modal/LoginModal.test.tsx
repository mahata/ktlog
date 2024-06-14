import LoginModal from "./LoginModal";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

const originalFetch = globalThis.fetch;

describe("LoginModal", () => {
  const mockedFetch = vi.fn();

  beforeEach(() => {
    mockedFetch.mockReset();
    globalThis.fetch = mockedFetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
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

      await userEvent.type(screen.getByLabelText("email"), "my-email");
      await userEvent.type(screen.getByLabelText("password"), "my-password");
      await userEvent.click(screen.getByRole("button", { name: "Send" }));

      // TODO: Change to verify if auth() in useAuthRepository is called
      expect(globalThis.fetch).toHaveBeenCalledWith(`/api/v1/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "my-email",
          password: "my-password",
        }),
      });
    });
  });
});
