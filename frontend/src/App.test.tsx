import App from "./App";
import { act, render, screen, waitFor } from "@testing-library/react";
import { StubArticlesRepository, StubUsersRepository } from "./StubRepos";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const originalTitle = document.title;

describe("App", () => {
  const stubArticleRepository = new StubArticlesRepository();
  const stubUsersRepository = new StubUsersRepository();
  stubArticleRepository.getAll.mockResolvedValue([]);
  stubUsersRepository.getMe.mockResolvedValue({ uname: null, email: null });

  it.each(["localhost", "127.0.0.1"])(
    'adds "dev|" to the title when it runs on the localhost',
    async (serviceDomain) => {
      render(
        <App
          ktlogDomain={serviceDomain}
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
    await act(async () => {
      render(
        <App
          ktlogDomain="example.com"
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
          ktlogDomain="example.com"
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
    expect(await screen.findByText("Social Login")).toBeInTheDocument();
  });

  afterEach(() => {
    document.title = originalTitle;
  });
});
