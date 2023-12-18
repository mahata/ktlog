import { render, screen, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";
import { StubUsersRepository } from "./StubRepos";

describe("SignUp", () => {
  const stubUserRepository = new StubUsersRepository();

  beforeEach(() => {
    stubUserRepository.getMe.mockResolvedValue({
      name: "Yasunori MAHATA",
      email: "mahata777@gmail.com",
    });
  });

  it("puts the user's email address in the input field", async () => {
    render(<SignUp userRepository={stubUserRepository} />);

    const emailTextBox = screen.getByRole("textbox", {
      name: "email",
    }) as HTMLInputElement;
    await waitFor(() => {
      expect(emailTextBox.value).toBe("mahata777@gmail.com");
    });

    expect(screen.getByText("Let's Sign up!")).toBeInTheDocument();
  });
});
