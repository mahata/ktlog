import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Post from "./Post";

describe("Post", () => {
  it(`shows HTML form to submit a new article`, () => {
    render(<Post />);

    expect(screen.getByLabelText("title")).toBeInTheDocument();
    expect(screen.getByLabelText("content")).toBeInTheDocument();

    const postButton: HTMLButtonElement = screen.getByRole("button", {
      name: "Post!",
    });
    expect(postButton).toBeDisabled();
  });
});
