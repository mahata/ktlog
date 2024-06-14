import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useArticleRepository } from "./repository/useArticleRepository";
import { useAuthRepository } from "./repository/useAuthRepository";
import { makeArticleFixture } from "./fixture/makeArticleFixture";

const originalTitle = document.title;
const originalLocation = window.location;

vi.mock("./repository/useArticleRepository");
vi.mock("./repository/useAuthRepository");

describe("App", () => {
  beforeEach(() => {
    vi.mocked(useArticleRepository).mockReturnValue({
      getAll: vi.fn().mockResolvedValueOnce([makeArticleFixture()]),
      get: vi.fn().mockResolvedValueOnce(makeArticleFixture()),
    } satisfies ReturnType<typeof useArticleRepository>);
    vi.mocked(useAuthRepository).mockReturnValue({
      isAuthed: vi.fn().mockResolvedValueOnce({ isAuthed: false }),
    } satisfies ReturnType<typeof useAuthRepository>);
  });

  it.each(["localhost", "127.0.0.1"])(
    'adds "dev|" to the title when it runs on `%s`',
    async () => {
      render(<App />, {
        wrapper: MemoryRouter,
      });

      await waitFor(() => {
        expect(document.title).toBe(`dev|${originalTitle}`);
      });
    },
  );

  it('do NOT add "dev|" when it is not running on the localhost', async () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { ...window.location, hostname: "www.example.com" },
    });

    await act(async () => {
      render(<App />, {
        wrapper: MemoryRouter,
      });
    });

    expect(document.title).toBe(originalTitle);
  });

  it("shows a modal when the 'login' button is clicked", async () => {
    await act(async () => {
      render(<App />, {
        wrapper: MemoryRouter,
      });
    });

    const loginButton = screen.getByRole("button", {
      name: "Login",
    }) as HTMLButtonElement;

    await userEvent.click(loginButton);
    expect(
      await screen.findByLabelText("login-modal-title"),
    ).toBeInTheDocument();
  });

  afterEach(() => {
    document.title = originalTitle;
    window.location = originalLocation;
  });
});
