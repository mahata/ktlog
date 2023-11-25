import Modal from "./Modal";
import { render } from "@testing-library/react";

describe("Modal", () => {
  it("restricts page scrolling when it's active", () => {
    expect(window.document.body.style.overflowY).not.toBe("hidden");

    render(<Modal />);

    expect(window.document.body.style.overflowY).toBe("hidden");
  });

  it("allows page scrolling when it's inactive", () => {
    const { unmount } = render(<Modal />);

    unmount();

    expect(window.document.body.style.overflowY).toBe("unset");
  });
});
