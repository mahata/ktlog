import LoginModal from "./LoginModal";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuthRepository } from "../../repository/useAuthRepository";
import { Atom, useAtom } from "jotai";
import { ApiResponse } from "../../type/ApiResponse";
import { loginModalAtom } from "./LoginModal.atoms";
import { toastMessageAtom } from "../Toast/Toast.atoms";

vi.mock("jotai", () => ({
  ...vi.importActual("jotai"),
  atom: vi.fn(),
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
  const authResponse = { success: true } satisfies ApiResponse;
  const authStatusResponse = { success: true } satisfies ApiResponse;
  const mockedAuthRepository = createMockAuthRepository(
    authResponse,
    authStatusResponse,
  );

  const showLoginModal = true;
  const setShowLoginModal: Setter<boolean> = vi.fn();
  const mockedLoginModalAtom = createMockAtom(
    showLoginModal,
    setShowLoginModal,
  );

  const toastMessage = "";
  const setToastMessage: Setter<string> = vi.fn();
  const mockedToastMessageAtom = createMockAtom(toastMessage, setToastMessage);

  beforeEach(() => {
    vi.mocked(useAuthRepository).mockReturnValue(mockedAuthRepository);
    // @ts-expect-error Because TS doesn't like Atom<unknown>
    vi.mocked(useAtom).mockImplementation((atom: Atom<unknown>) => {
      if (atom === loginModalAtom) return mockedLoginModalAtom;
      if (atom === toastMessageAtom) return mockedToastMessageAtom;
      throw new Error("Unknown atom");
    });
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
    beforeEach(async () => {
      render(<LoginModal title="DOES NOT MATTER" />);

      await userEvent.type(
        screen.getByLabelText("email"),
        "john-doe@example.com",
      );
      await userEvent.type(screen.getByLabelText("password"), "password");
    });

    it("sends a request when clicked", async () => {
      await userEvent.click(screen.getByRole("button", { name: "Send" }));

      expect(useAuthRepository().auth).toHaveBeenCalledWith(
        "john-doe@example.com",
        "password",
      );
    });

    describe("When login succeeds", () => {
      it("setShowLoginModal(false) is closed", async () => {
        await userEvent.click(screen.getByRole("button", { name: "Send" }));

        await waitFor(() => {
          expect(setShowLoginModal).toHaveBeenCalledWith(false);
        });
      });
    });

    // it("shows an error message when login fails", async () => {
    //   (authRepoMock.auth as jest.Mock).mockReturnValue({
    //     authed: true,
    //   });
    //
    //   await waitFor(() => {
    //     expect(screen.getByText("Password is wrong")).toBeVisible();
    //   });
    // });
  });
});
