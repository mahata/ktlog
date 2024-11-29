import { LoginForm } from "@/component/Form/LoginForm"
import { _useAuthRepository } from "@/test-helper/__mocks__/useAuthRepository"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

vi.mock("@/repository/useAuthRepository", () => import("@/test-helper/__mocks__/useAuthRepository"))

describe("LoginForm", () => {
  const originalAuthMock = _useAuthRepository.authMock

  afterEach(() => {
    _useAuthRepository.authMock = originalAuthMock
  })

  it("shows fields and submit button", () => {
    render(<LoginForm closeModal={() => {}} />)

    expect(screen.getByLabelText("Email")).toBeVisible()
    expect(screen.getByLabelText("Password")).toBeVisible()
    expect(screen.getByRole("button", { name: "Send login request" })).toBeVisible()
  })

  it("make login button active only when email and password are not empty", async () => {
    render(<LoginForm closeModal={() => {}} />)

    const loginButton = screen.getByRole("button", {
      name: "Send login request",
    })
    expect(loginButton).toBeDisabled()

    await userEvent.type(screen.getByLabelText("Email"), "email@example.com")
    await userEvent.type(screen.getByLabelText("Password"), "password")

    expect(loginButton).not.toBeDisabled()
  })

  it("sends an HTTP request when login button is clicked with email and password", async () => {
    render(<LoginForm closeModal={() => {}} />)

    await userEvent.type(screen.getByLabelText("Email"), "email@example.com")
    await userEvent.type(screen.getByLabelText("Password"), "password")
    await userEvent.click(screen.getByRole("button", { name: "Send login request" }))

    expect(_useAuthRepository.authMock).toHaveBeenCalledWith("email@example.com", "password")
  })

  it("shows error message when auth API returns error message", async () => {
    render(<LoginForm closeModal={() => {}} />)
    _useAuthRepository.authMock = vi.fn().mockResolvedValue({ success: false })

    await userEvent.type(screen.getByLabelText("Email"), "email@example.com")
    await userEvent.type(screen.getByLabelText("Password"), "password")
    await userEvent.click(screen.getByRole("button", { name: "Send login request" }))

    expect(await screen.findByText("Password is wrong")).toBeVisible()
  })
})
