import { expect, it, vi, describe, Mock } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Articles from "./Articles";
import { StubArticlesRepository } from "./StubRepos";
import { MemoryRouter, useParams } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as {
    [key: string]: never;
  };
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe("Articles", () => {
  it("shows 'Articles' header", async () => {
    (useParams as Mock).mockReturnValue({ uname: undefined });
    const stubArticlesRepository = new StubArticlesRepository();
    stubArticlesRepository.getAll.mockResolvedValue([]);
    render(<Articles articleRepository={stubArticlesRepository} />);

    await act(async () => {
      await stubArticlesRepository.getAll();
    });

    expect(screen.getByText("Articles")).toBeInTheDocument();
  });

  it("shows all articles retrieved from the getAll() method of the repository when uname isn't set", async () => {
    (useParams as Mock).mockReturnValue({ uname: undefined });
    const stubArticlesRepository = new StubArticlesRepository();
    stubArticlesRepository.getAll.mockResolvedValue([
      {
        id: "d8fec293-97c1-46b7-a1d4-458da3689dcd",
        title: "my title",
        content: "this does not matter",
      },
    ]);
    render(<Articles articleRepository={stubArticlesRepository} />, {
      wrapper: MemoryRouter,
    });

    const articleLink = (await screen.findByRole("link", {
      name: "my title",
    })) as HTMLAnchorElement;

    expect(articleLink).toBeInTheDocument();
    expect(articleLink.href).toBe(
      window.location.origin + "/articles/d8fec293-97c1-46b7-a1d4-458da3689dcd",
    );
  });

  it("shows articles retrieved from the getAllByUname(uname) method of the repository when uname is set", async () => {
    (useParams as Mock).mockReturnValue({ uname: "mahata" });
    const stubArticlesRepository = new StubArticlesRepository();
    stubArticlesRepository.getAllByUname.mockResolvedValue([
      {
        id: "d8fec293-97c1-46b7-a1d4-458da3689dcd",
        title: "my title",
        content: "this does not matter",
      },
    ]);
    render(<Articles articleRepository={stubArticlesRepository} />, {
      wrapper: MemoryRouter,
    });

    const articleLink = (await screen.findByRole("link", {
      name: "my title",
    })) as HTMLAnchorElement;

    expect(articleLink).toBeInTheDocument();
    expect(articleLink.href).toBe(
      window.location.origin + "/articles/d8fec293-97c1-46b7-a1d4-458da3689dcd",
    );
  });
});
