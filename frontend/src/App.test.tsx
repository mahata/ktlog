import App from "./App";
import { act, render, waitFor } from "@testing-library/react";
import { StubArticlesRepository, StubUsersRepository } from "./StubRepos";
import { MemoryRouter } from "react-router-dom";

const originalTitle = document.title;

describe("App", () => {
  const stubArticleRepository = new StubArticlesRepository();
  const stubUsersRepository = new StubUsersRepository();
  stubArticleRepository.getAll.mockResolvedValue([]);
  stubUsersRepository.getMe.mockResolvedValue({ name: null, email: null });

  it.each(["localhost", "127.0.0.1"])(
    'adds "dev|" to the title when it runs on the localhost',
    async (serviceDomain) => {
      render(
        <App
          ktlogDomain={serviceDomain}
          articlesRepository={stubArticleRepository}
          usersRepository={stubUsersRepository}
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
          articlesRepository={stubArticleRepository}
          usersRepository={stubUsersRepository}
        />,
        {
          wrapper: MemoryRouter,
        },
      );
    });

    expect(document.title).toBe(originalTitle);
  });

  afterEach(() => {
    document.title = originalTitle;
  });
});
