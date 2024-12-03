import { LoginPage } from "@/page/LoginPage/LoginPage"
import { _useAuthRepository } from "@/test-helper/__mocks__/useAuthRepository"
import type { ApiResponse } from "@/type/ApiResponse"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

vi.mock("@/repository/useAuthRepository", () => import("@/test-helper/__mocks__/useAuthRepository"))

const originalAuthMock = _useAuthRepository.authMock

it("shows 'Login' text", () => {
  render(<LoginPage />)
  expect(screen.getByText("Login")).toBeVisible()
})

it("saves accessToken to localStorage when login is successful", async () => {
  render(<LoginPage />)

  _useAuthRepository.authMock = vi.fn().mockResolvedValueOnce({
    success: true,
    data: {
      accessToken: "token",
    },
  } satisfies ApiResponse)

  await userEvent.type(screen.getByLabelText("Email"), "email")
  await userEvent.type(screen.getByLabelText("Password"), "password")
  await userEvent.click(screen.getByRole("button", { name: "Send login request" }))

  expect(localStorage.getItem("accessToken")).toBe("token")
})

afterEach(() => {
  localStorage.clear()
  _useAuthRepository.authMock = originalAuthMock
})
