import App from "./App";
import { act, render, waitFor } from "@testing-library/react";
import { StubArticlesRepository } from "./StubRepos";
import { MemoryRouter } from "react-router-dom";

const originalTitle = document.title;

describe("App", () => {
  it.each(["localhost", "127.0.0.1"])(
    'adds "dev|" to the title when it runs on the localhost',
    async (serviceDomain) => {
      const stubArticleRepository = new StubArticlesRepository();
      stubArticleRepository.getAll.mockResolvedValue([]);

      render(
        <App
          ktlogDomain={serviceDomain}
          articlesRepository={stubArticleRepository}
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
    const stubArticleRepository = new StubArticlesRepository();
    stubArticleRepository.getAll.mockResolvedValue([]);

    await act(async () => {
      render(
        <App
          ktlogDomain="example.com"
          articlesRepository={stubArticleRepository}
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
