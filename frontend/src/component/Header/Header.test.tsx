import { useAuthRepository } from "@/repository/useAuthRepository";
import { _jotai } from "@/test-helper/__mocks__/jotai";
import { createMockAtom } from "@/test-helper/stub";
import type { ApiResponse } from "@/type/ApiResponse";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

vi.mock("jotai", () => import("@/test-helper/__mocks__/jotai"));

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

			// @ts-ignore
			_jotai.showLoginModalAtomMock = createMockAtom(true, vi.fn());
			render(<Header />, {
				wrapper: MemoryRouter,
			});

			const postButton = await screen.findByRole("button", { name: "Post" });
			expect(postButton).toBeInTheDocument();
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

			_jotai.showLoginModalAtomMock = createMockAtom(false, vi.fn());
			render(<Header />, {
				wrapper: MemoryRouter,
			});

			const loginButton = await screen.findByRole("button", { name: "Login" });
			expect(loginButton).toBeInTheDocument();
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
			expect(logoLink.href).toBe(`${window.location.origin}/`);
		});
	});
});
