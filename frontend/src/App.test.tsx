import { expect, it, describe, afterEach } from "vitest";
import App from "./App";
import { act, render, screen, waitFor } from "@testing-library/react";
import { StubArticlesRepository, StubUsersRepository } from "./StubRepos";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const originalTitle = document.title;
const originalLocation = window.location;

describe("App", () => {
  const stubArticleRepository = new StubArticlesRepository();
  const stubUsersRepository = new StubUsersRepository();
  stubArticleRepository.getAll.mockResolvedValue([]);
  stubUsersRepository.getMe.mockResolvedValue({ uname: null, email: null });

  it.each(["localhost", "127.0.0.1"])(
    'adds "dev|" to the title when it runs on `%s`',
    async () => {
      render(
        <App
          articleRepository={stubArticleRepository}
          userRepository={stubUsersRepository}
        />,
        {
          wrapper: MemoryRouter,
        },
      );

      await waitFor(() => {
        expect(document.title).toBe(`dev|${originalTitle}`);
      });
    },
  );

  it('do NOT add "dev|" when it is not running on the localhost', async () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, hostname: 'www.example.com' }
    });

    await act(async () => {
      render(
        <App
          articleRepository={stubArticleRepository}
          userRepository={stubUsersRepository}
        />,
        {
          wrapper: MemoryRouter,
        },
      );
    });

    expect(document.title).toBe(originalTitle);
  });

  it("shows a modal when the 'login' button is clicked", async () => {
    await act(async () => {
      render(
        <App
          articleRepository={stubArticleRepository}
          userRepository={stubUsersRepository}
        />,
        {
          wrapper: MemoryRouter,
        },
      );
    });

    const loginButton = screen.getByRole("button", {
      name: "Login",
    }) as HTMLButtonElement;

    await userEvent.click(loginButton);
    expect(await screen.findByLabelText("login-modal-title")).toBeInTheDocument();
  });

  afterEach(() => {
    document.title = originalTitle;
    window.location = originalLocation;
  });
});
