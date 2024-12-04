import { LoginPage } from "@/page/LoginPage/LoginPage"
import { _useAuthRepository } from "@/test-helper/__mocks__/useAuthRepository"
import type { ApiResponse } from "@/type/ApiResponse"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"

const navigateSpy = vi.fn()
vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useNavigate: () => navigateSpy,
}))

vi.mock("@/repository/useAuthRepository", () => import("@/test-helper/__mocks__/useAuthRepository"))

const originalAuthMock = _useAuthRepository.authMock

it("shows 'Login' text", () => {
  render(<LoginPage />)
  expect(screen.getByText("Login")).toBeVisible()
})

it("saves accessToken to localStorage when login is successful", async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  )

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

it("redirects to '/' when login is successful", async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  )

  _useAuthRepository.authMock = vi.fn().mockResolvedValueOnce({
    success: true,
    data: {
      accessToken: "token",
    },
  } satisfies ApiResponse)

  await userEvent.type(screen.getByLabelText("Email"), "email")
  await userEvent.type(screen.getByLabelText("Password"), "password")
  await userEvent.click(screen.getByRole("button", { name: "Send login request" }))

  await waitFor(() => expect(navigateSpy).toHaveBeenCalledWith("/"))
})

afterEach(() => {
  localStorage.clear()
  _useAuthRepository.authMock = originalAuthMock
})
