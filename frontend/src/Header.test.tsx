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
    expect(loginLink.href).toBe(window.location.origin + "/login");
  });

  describe("Service Logo", () => {
    it("is in the header", () => {
      render(<Header />, { wrapper: MemoryRouter });

      const logo = screen.getByRole("img", { name: "Site Logo" });

      expect(logo).toBeInTheDocument();
    });

    it("is linked to '/'", () => {
      render(<Header />, { wrapper: MemoryRouter });

      const logoLink = screen.getByRole("link", {
        name: "Site Logo",
      }) as HTMLAnchorElement;

      expect(logoLink).toBeInTheDocument();
      expect(logoLink.href).toBe(window.location.origin + "/");
    });
  });
});
