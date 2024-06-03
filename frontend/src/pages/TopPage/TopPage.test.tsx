import { expect, it, vi, describe, Mock } from "vitest";
import { act, render, screen } from "@testing-library/react";
import TopPage from "./TopPage";
import { StubArticlesRepository } from "../../StubRepos";
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

describe("TopPage", () => {
  const stubArticlesRepository = new StubArticlesRepository();

  it("shows 'TopPage' header", async () => {
    (useParams as Mock).mockReturnValue({ uname: undefined });
    stubArticlesRepository.getAll.mockResolvedValue([]);
    render(<TopPage articleRepository={stubArticlesRepository} />);

    await act(async () => {
      await stubArticlesRepository.getAll();
    });

    expect(screen.getByText("Articles")).toBeInTheDocument();
  });

  it("shows all articles", async () => {
    (useParams as Mock).mockReturnValue({ uname: undefined });
    stubArticlesRepository.getAll.mockResolvedValue([
      {
        id: "d8fec293-97c1-46b7-a1d4-458da3689dcd",
        title: "my title",
        content: "my content",
      },
    ]);
    render(<TopPage articleRepository={stubArticlesRepository} />, {
      wrapper: MemoryRouter,
    });

    const articleLink = (await screen.findByRole("link", {
      name: "my title",
    })) as HTMLAnchorElement;

    expect(articleLink).toBeInTheDocument();
    expect(articleLink.href).toBe(
      window.location.origin + "/articles/d8fec293-97c1-46b7-a1d4-458da3689dcd",
    );

    expect(screen.getByText("my content")).toBeInTheDocument();
  });

  it("strips article contents when it's more than 200 chars", async () => {
    (useParams as Mock).mockReturnValue({ uname: undefined });
    stubArticlesRepository.getAll.mockResolvedValue([
      {
        id: "d8fec293-97c1-46b7-a1d4-458da3689dcd",
        title: "my title 1",
        content: "x".repeat(200),
      },
      {
        id: "2da288aa-aabd-4555-befe-30c71d1ee559",
        title: "my title 2",
        content: "y".repeat(201),
      },
    ]);
    render(<TopPage articleRepository={stubArticlesRepository} />, {
      wrapper: MemoryRouter,
    });

    await screen.findByText("x".repeat(200));
    expect(screen.getByText("y".repeat(200) + "..."));
  });
});
