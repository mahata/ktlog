import { authedAtom, showLoginModalAtom, toastMessageAtom } from "@/atoms";
import { useAuthRepository } from "@/repository/useAuthRepository";
import {
	type Setter,
	createMockAtom,
	mockedAuthedAtom,
	mockedShowLoginModalAtom,
	mockedToastMessageAtom,
} from "@/test-helper/stub";
import type { ApiResponse } from "@/type/ApiResponse";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type Atom, useAtom } from "jotai";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

vi.mock("jotai", async () => ({
	...(await vi.importActual("jotai")),
	useAtom: vi.fn(),
}));

vi.mock("../../repository/useAuthRepository");

describe("Header", () => {
	describe("Login", () => {
		it("shows 'Post' button when the user is logged in", async () => {
			const myMockedAuthedAtom = createMockAtom(
				true,
				vi.fn() satisfies Setter<boolean>,
			);

			// @ts-expect-error Because TS doesn't like Atom<unknown>
			vi.mocked(useAtom).mockImplementation((atom: Atom<unknown>) => {
				if (atom === showLoginModalAtom) return mockedShowLoginModalAtom;
				if (atom === toastMessageAtom) return mockedToastMessageAtom;
				if (atom === authedAtom) return myMockedAuthedAtom;
				throw new Error("Unknown atom");
			});

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

			const postButton = await screen.findByRole("button", { name: "Post" });
			expect(postButton).toBeInTheDocument();
		});

		it("shows 'Login' button when the user is NOT logged in", async () => {
			const mySetShowLoginModal = vi.fn() satisfies Setter<boolean>;
			const myMockedShowLoginModalAtom = createMockAtom(
				false,
				mySetShowLoginModal,
			);

			// @ts-expect-error Because TS doesn't like Atom<unknown>
			vi.mocked(useAtom).mockImplementation((atom: Atom<unknown>) => {
				if (atom === showLoginModalAtom) return myMockedShowLoginModalAtom;
				if (atom === toastMessageAtom) return mockedToastMessageAtom;
				if (atom === authedAtom) return mockedAuthedAtom;
				throw new Error("Unknown atom");
			});

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

			const loginButton = await screen.findByRole("button", { name: "Login" });
			expect(loginButton).toBeInTheDocument();

			expect(mySetShowLoginModal).not.toHaveBeenCalled();
			await userEvent.click(loginButton);
			expect(mySetShowLoginModal).toBeCalledWith(true);
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
