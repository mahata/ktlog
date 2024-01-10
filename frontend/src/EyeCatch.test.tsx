import EyeCatch from "./EyeCatch";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it, describe } from "vitest";

describe("EyeCatch", () => {
  it("shows an eye-catch logo", () => {
    render(<EyeCatch />, { wrapper: MemoryRouter });

    const eyeCatchImage = screen.getByRole("img", {
      name: "Eye Catch Cat Logo",
    });
    expect(eyeCatchImage).toBeInTheDocument();
  });

  it("is linked to '/'", () => {
    render(<EyeCatch />, { wrapper: MemoryRouter });

    const eyeCatchLogoLink = screen.getByRole("link", {
      name: "Eye Catch Cat Logo",
    }) as HTMLAnchorElement;

    expect(eyeCatchLogoLink).toBeInTheDocument();
    expect(eyeCatchLogoLink.href).toBe(window.location.origin + "/");
  });
});
