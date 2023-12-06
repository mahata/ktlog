import { describe } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { StubUsersRepository } from "./StubRepos";

describe("Header", () => {
  const stubUsersRepository = new StubUsersRepository();

  beforeEach(() => {
    stubUsersRepository.getMe.mockResolvedValue({
      name: "Yasunori MAHATA",
      email: "mahata777@gmail.com",
    });
  });

  describe("Login", () => {
    it("shows 'login' button when the user isn't logged in", () => {
      stubUsersRepository.getMe.mockResolvedValue({
        name: null,
        email: null,
      });

      render(<Header usersRepository={stubUsersRepository} />, {
        wrapper: MemoryRouter,
      });

      const loginButton = screen.getByRole("button", {
        name: "Login",
      }) as HTMLAnchorElement;

      expect(loginButton).toBeInTheDocument();
    });

    it("shows a username when the user is logged in", async () => {
      stubUsersRepository.getMe.mockResolvedValue({
        name: "Yasunori MAHATA",
        email: "mahata777@gmail.com",
      });
      render(<Header usersRepository={stubUsersRepository} />, {
        wrapper: MemoryRouter,
      });

      expect(await screen.findByText("Yasunori MAHATA")).toBeInTheDocument();
    });
  });

  describe("Service Logo", () => {
    it("is in the header", async () => {
      await act(async () => {
        render(<Header usersRepository={stubUsersRepository} />, {
          wrapper: MemoryRouter,
        });
      });

      const logo = screen.getByRole("img", { name: "Site Logo" });

      expect(logo).toBeInTheDocument();
    });

    it("is linked to '/'", async () => {
      await act(async () => {
        render(<Header usersRepository={stubUsersRepository} />, {
          wrapper: MemoryRouter,
        });
      });

      const logoLink = screen.getByRole("link", {
        name: "Site Logo",
      }) as HTMLAnchorElement;

      expect(logoLink).toBeInTheDocument();
      expect(logoLink.href).toBe(window.location.origin + "/");
    });
  });
});
