import LoginModal from "./LoginModal";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("LoginModal", () => {
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

  it("shows username and password input fields", () => {
    render(<LoginModal title="DOES NOT MATTER" />);

    const usernameField = screen.getByLabelText("username")
    expect(usernameField).toHaveAttribute("placeholder", "Please type your username");

    const passwordField = screen.getByLabelText("password")
    expect(passwordField).toHaveAttribute("placeholder", "Please type your password");
  });
});
