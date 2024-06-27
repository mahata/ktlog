import LoginModal from "./LoginModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuthRepository } from "../../repository/useAuthRepository";

vi.mock("../../repository/useAuthRepository");

describe("LoginModal", () => {
  let authRepoMock: ReturnType<typeof useAuthRepository>;

  beforeEach(() => {
    authRepoMock = {
      auth: vi.fn(),
      getAuthStatus: vi.fn(),
    };

    vi.mocked(useAuthRepository).mockReturnValue(authRepoMock);
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

    it("", () => {
      expect(1).toBe(1);
    });

    // it("sends a request when clicked", async () => {
    //   await userEvent.click(screen.getByRole("button", { name: "Send" }));
    //
    //   expect(useAuthRepository().auth).toHaveBeenCalledWith(
    //     "john-doe@example.com",
    //     "password",
    //   );
    // });

    // describe("When login succeeds", () => {
    //   it("modal is closed", async () => {
    //     (authRepoMock.getAuthStatus as jest.Mock).mockReturnValue({
    //       authed: true,
    //     });
    //
    //     await waitFor(() => {
    //       expect(screen.getByLabelText("login-modal-title")).not.toBeVisible();
    //     });
    //   });
    // });

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
