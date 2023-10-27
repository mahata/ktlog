import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("shows 'login' link", () => {
    render(<App />, { wrapper: MemoryRouter });

    const loginLink = screen.getByRole("link", {
      name: "Login",
    }) as HTMLAnchorElement;

    expect(loginLink).toBeInTheDocument();
    expect(loginLink.href).toMatch(/\/login$/);
  });

  it("shows 'Posts' header", () => {
    render(<App />, { wrapper: MemoryRouter });

    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
