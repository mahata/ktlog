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
      getAuthStatus: vi
        .fn()
        .mockResolvedValueOnce({ success: true, data: { authed: false } }), // TODO: Put this into helper
      auth: vi.fn().mockResolvedValueOnce({ success: true }),
    } satisfies ReturnType<typeof useAuthRepository>);
  });

  afterEach(() => {
    document.title = originalTitle;
    window.location = originalLocation;
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

  describe("Login Action", () => {
    beforeEach(() => {});
    it("A modal is shown when the 'login' button is clicked", async () => {
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

    it("The modal is closed when 'Send' button is clicked", async () => {
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

      const loginModalTitle = screen.queryByLabelText("login-modal-title");
      expect(loginModalTitle).toBeInTheDocument();
      await userEvent.click(screen.getByRole("button", { name: "Send" }));

      await waitFor(() => {
        expect(loginModalTitle).not.toBeVisible();
      });
    });

    it("A toast message is shown when 'Send' button is clicked", async () => {
      // TODO
    });

    it("A toast message is closed after 6 seconds", async () => {
      // TODO
    });
  });
});
