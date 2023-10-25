import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("shows 'login' link", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shows 'Posts' header", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
