import LoginModal from "./LoginModal";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AuthResponse,
  GetAuthStatusResponse,
  useAuthRepository,
} from "../../repository/useAuthRepository";
import { Atom, useAtom } from "jotai";
import { ApiResponse } from "../../type/ApiResponse";
import { authedAtom, showLoginModalAtom, toastMessageAtom } from "../../atoms";

vi.mock("jotai", async () => ({
  ...(await vi.importActual("jotai")),
  useAtom: vi.fn(),
}));

vi.mock("../../repository/useAuthRepository");

type Setter<T> = (value: T) => void;

function createMockAtom<T>(value: T, setter: Setter<T>): [T, Setter<T>] {
  return [value, vi.fn().mockImplementation(setter)];
}

const createMockAuthRepository = (
  authResponse: ApiResponse,
  authStatusResponse: ApiResponse,
) => ({
  auth: vi.fn().mockResolvedValue(authResponse),
  getAuthStatus: vi.fn().mockResolvedValue(authStatusResponse),
});

describe("LoginModal", () => {
  const mockedAuthRepository = createMockAuthRepository(
    { success: true } satisfies AuthResponse,
    { success: true } satisfies GetAuthStatusResponse,
  );

  const mockedShowLoginModalAtom = createMockAtom(
    true,
    vi.fn() satisfies Setter<boolean>,
  );

  const mockedToastMessageAtom = createMockAtom(
    "",
    vi.fn() satisfies Setter<string>,
  );

  const mockedAuthedAtom = createMockAtom(
    false,
    vi.fn() satisfies Setter<boolean>,
  );

  beforeEach(() => {
    // @ts-expect-error Because TS doesn't like Atom<unknown>
    vi.mocked(useAtom).mockImplementation((atom: Atom<unknown>) => {
      if (atom === showLoginModalAtom) return mockedShowLoginModalAtom;
      if (atom === toastMessageAtom) return mockedToastMessageAtom;
      if (atom === authedAtom) return mockedAuthedAtom;
      throw new Error("Unknown atom");
    });
    vi.mocked(useAuthRepository).mockReturnValue(mockedAuthRepository);
  });

  it("restricts page scrolling when it's active", () => {
    expect(window.document.body.style.overflowY).not.toBe("hidden");

    render(<LoginModal title="DOES NOT MATTER" />);

    expect(window.document.body.style.overflowY).toBe("hidden");
  });

  it("allows page scrolling when it's inactive", () => {
    const { unmount } = render(<LoginModal title="DOES NOT MATTER" />);

    unmount();

    expect(window.document.body.style.overflowY).toBe("unset");
  });

  it("shows email and password input fields", () => {
    render(<LoginModal title="DOES NOT MATTER" />);

    const emailField = screen.getByLabelText("email");
    expect(emailField).toHaveAttribute("placeholder", "Please type your email");

    const passwordField = screen.getByLabelText("password");
    expect(passwordField).toHaveAttribute(
      "placeholder",
      "Please type your password",
    );
  });

  it("shows a login button", () => {
    render(<LoginModal title="DOES NOT MATTER" />);

    expect(screen.getByRole("button", { name: "Send" }));
  });

  describe("Login Button", () => {
    it("sends a request when clicked", async () => {
      render(<LoginModal title="DOES NOT MATTER" />);

      await userEvent.type(
        screen.getByLabelText("email"),
        "john-doe@example.com",
      );
      await userEvent.type(screen.getByLabelText("password"), "password");
      await userEvent.click(screen.getByRole("button", { name: "Send" }));

      expect(useAuthRepository().auth).toHaveBeenCalledWith(
        "john-doe@example.com",
        "password",
      );
    });

    it("sends a request when enter key is pressed", async () => {
      render(<LoginModal title="DOES NOT MATTER" />);

      await userEvent.type(
        screen.getByLabelText("email"),
        "john-doe@example.com",
      );
      await userEvent.type(
        screen.getByLabelText("password"),
        "password{enter}",
      );

      expect(useAuthRepository().auth).toHaveBeenCalledWith(
        "john-doe@example.com",
        "password",
      );
    });

    describe("When login succeeds", () => {
      it("setShowLoginModal(false) is called", async () => {
        const setShowLoginModal: Setter<boolean> = vi.fn();
        const mockedLoginModalAtom = createMockAtom(true, setShowLoginModal);

        // @ts-expect-error Because TS doesn't like Atom<unknown>
        vi.mocked(useAtom).mockImplementation((atom: Atom<unknown>) => {
          if (atom === showLoginModalAtom) return mockedLoginModalAtom;
          if (atom === toastMessageAtom) return mockedToastMessageAtom;
          if (atom === authedAtom) return mockedAuthedAtom;
          throw new Error("Unknown atom");
        });

        render(<LoginModal title="DOES NOT MATTER" />);

        await userEvent.click(screen.getByRole("button", { name: "Send" }));

        await waitFor(() => {
          expect(setShowLoginModal).toHaveBeenCalledWith(false);
        });
      });
    });

    describe("When login fails", () => {
      it("shows an error message", async () => {
        vi.mocked(useAuthRepository).mockReturnValue(
          createMockAuthRepository(
            { success: false } satisfies AuthResponse,
            { success: false } satisfies GetAuthStatusResponse,
          ),
        );

        render(<LoginModal title="DOES NOT MATTER" />);

        await userEvent.click(screen.getByRole("button", { name: "Send" }));

        await waitFor(() => {
          expect(screen.getByText("Password is wrong")).toBeVisible();
        });
      });
    });
  });
});
