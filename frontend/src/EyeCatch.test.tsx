import EyeCatch from "./EyeCatch";
import { render, screen } from "@testing-library/react";

describe("EyeCatch", () => {
  it("shows an eye-catch logo", () => {
    render(<EyeCatch />);

    const eyeCatchImage = screen.getByRole("img", { name: "eye-catch-logo" });
    expect(eyeCatchImage).toBeInTheDocument();
  });
});
