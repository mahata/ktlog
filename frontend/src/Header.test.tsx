import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  it("shows 'login' link", () => {
    render(<Header />, { wrapper: MemoryRouter });

    const loginLink = screen.getByRole("link", {
      name: "Login",
    }) as HTMLAnchorElement;

    expect(loginLink).toBeInTheDocument();
    expect(loginLink.href).toMatch(/\/login$/);
  });

  it("shows a service logo", () => {
    render(<Header />, { wrapper: MemoryRouter });

    const logo = screen.getByRole("img", { name: "logo" });

    expect(logo).toBeInTheDocument();
  });
});
