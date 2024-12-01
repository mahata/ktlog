import LoginPage from "@/page/LoginPage/LoginPage"
import { render, screen } from "@testing-library/react"

it("shows 'Login' text", () => {
  render(<LoginPage />)
  expect(screen.getByText("Login")).toBeVisible()
})
