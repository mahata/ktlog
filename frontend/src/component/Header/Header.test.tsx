import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { useAuthRepository } from "../../repository/useAuthRepository";
import { ApiResponse } from "../../type/ApiResponse";

vi.mock("../../repository/useAuthRepository");

describe("Header", () => {
  describe("Login", () => {
    it("shows 'Post' button when the user is logged in", async () => {
      vi.mocked(useAuthRepository).mockReturnValue({
        getAuthStatus: vi.fn().mockResolvedValue({
          success: true,
          data: {
            authed: true,
          },
        } satisfies ApiResponse),
        auth: vi.fn().mockResolvedValueOnce({
          success: true,
        } satisfies ApiResponse),
      } satisfies ReturnType<typeof useAuthRepository>);

      render(<Header />, {
        wrapper: MemoryRouter,
      });

      expect(
        await screen.findByRole("button", { name: "Post" }),
      ).toBeInTheDocument();
    });

    it("shows 'Login' button when the user is NOT logged in", async () => {
      vi.mocked(useAuthRepository).mockReturnValue({
        getAuthStatus: vi.fn().mockResolvedValue({
          success: true,
          data: {
            authed: false,
          },
        } satisfies ApiResponse),
        auth: vi.fn().mockResolvedValueOnce({
          success: true,
        } satisfies ApiResponse),
      });

      render(<Header />, {
        wrapper: MemoryRouter,
      });

      expect(
        await screen.findByRole("button", { name: "Login" }),
      ).toBeInTheDocument();
    });
  });

  describe("Service Logo", () => {
    it("is in the header", async () => {
      render(<Header />, {
        wrapper: MemoryRouter,
      });

      const logo = await screen.findByRole("img", { name: "Site Logo" });

      expect(logo).toBeInTheDocument();
    });

    it("is linked to '/'", async () => {
      render(<Header />, {
        wrapper: MemoryRouter,
      });

      const logoLink = (await screen.findByRole("link", {
        name: "Site Logo",
      })) as HTMLAnchorElement;

      expect(logoLink).toBeInTheDocument();
      expect(logoLink.href).toBe(window.location.origin + "/");
    });
  });
});
