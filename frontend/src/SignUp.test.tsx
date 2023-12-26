import { render, screen, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";
import { StubUsersRepository } from "./StubRepos";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("SignUp", () => {
  const stubUserRepository = new StubUsersRepository();

  beforeEach(() => {
    stubUserRepository.getMe.mockResolvedValue({
      uname: "Yasunori MAHATA",
      email: "mahata777@gmail.com",
    });
  });

  const waitUseEffect = async () => {
    const emailTextBox = screen.getByRole("textbox", {
      name: "email",
    }) as HTMLInputElement;
    await waitFor(() => {
      expect(emailTextBox.value).toBe("mahata777@gmail.com");
    });
  };

  it("shows the authed user's email address in the input field", async () => {
    render(<SignUp userRepository={stubUserRepository} />, {
      wrapper: MemoryRouter,
    });
    await waitUseEffect();

    expect(screen.getByText("Let's Sign up!")).toBeInTheDocument();
  });

  describe("Button", () => {
    it("is disabled by default", async () => {
      render(<SignUp userRepository={stubUserRepository} />, {
        wrapper: MemoryRouter,
      });
      await waitUseEffect();

      const signUpButton: HTMLButtonElement = screen.getByRole("button", {
        name: "Sign up!",
      });
      expect(signUpButton).toBeDisabled();
    });

    it("gets enabled when the uname isn't empty", async () => {
      render(<SignUp userRepository={stubUserRepository} />, {
        wrapper: MemoryRouter,
      });
      await waitUseEffect();

      const signUpButton: HTMLButtonElement = screen.getByRole("button", {
        name: "Sign up!",
      });
      const unameInput: HTMLInputElement = screen.getByLabelText("uname");

      await userEvent.type(unameInput, "MyName");
      expect(signUpButton).not.toBeDisabled();
      await userEvent.clear(unameInput);
      expect(signUpButton).toBeDisabled();
    });

    it("gets disabled when the uname length is more than 63 chars", async () => {
      render(<SignUp userRepository={stubUserRepository} />, {
        wrapper: MemoryRouter,
      });
      await waitUseEffect();

      const signUpButton: HTMLButtonElement = screen.getByRole("button", {
        name: "Sign up!",
      });
      const unameInput: HTMLInputElement = screen.getByLabelText("uname");

      await userEvent.type(unameInput, "a".repeat(63));
      expect(signUpButton).not.toBeDisabled();
      await userEvent.type(unameInput, "a");
      expect(signUpButton).toBeDisabled();
    });

    it("gets disabled when the uname has non-alpha-numerical values", async () => {
      render(<SignUp userRepository={stubUserRepository} />, {
        wrapper: MemoryRouter,
      });
      await waitUseEffect();

      const signUpButton: HTMLButtonElement = screen.getByRole("button", {
        name: "Sign up!",
      });
      const unameInput: HTMLInputElement = screen.getByLabelText("uname");

      await userEvent.type(unameInput, "😁");
      expect(signUpButton).toBeDisabled();
    });

    it("makes an HTTP request when the it's clicked", async () => {
      render(<SignUp userRepository={stubUserRepository} />, {
        wrapper: MemoryRouter,
      });
      await waitUseEffect();

      const signUpButton: HTMLButtonElement = screen.getByRole("button", {
        name: "Sign up!",
      });
      const unameInput: HTMLInputElement = screen.getByLabelText("uname");

      await userEvent.type(unameInput, "MyName");
      await userEvent.click(signUpButton);

      expect(stubUserRepository.save).toHaveBeenCalledWith({
        email: "mahata777@gmail.com",
        uname: "MyName",
      });
    });

    it("redirects users back to '/' after clicking the signup button", async () => {
      render(
        <MemoryRouter initialEntries={["/signup"]}>
          <Routes>
            <Route path="/" element={<div>Destination</div>} />
            <Route
              path="/signup"
              element={<SignUp userRepository={stubUserRepository} />}
            />
          </Routes>
        </MemoryRouter>,
      );

      await waitUseEffect();

      const signUpButton: HTMLButtonElement = screen.getByRole("button", {
        name: "Sign up!",
      });
      const unameInput: HTMLInputElement = screen.getByLabelText("uname");

      await userEvent.type(unameInput, "MyName");
      await userEvent.click(signUpButton);

      await waitFor(() => {
        expect(screen.getByText("Destination")).toBeInTheDocument();
      });
    });
  });
});
