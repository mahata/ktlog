import { NewArticlePage } from "@/page/NewArticlePage/NewArticlePage"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { vi } from "vitest";

const navigateSpy = vi.fn()
vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useNavigate: () => navigateSpy,
}))

afterEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

it("redirects to login page when not logged in", () => {
  render(
    <MemoryRouter>
      <NewArticlePage />
    </MemoryRouter>,
  )

  expect(navigateSpy).toHaveBeenCalledWith("/")
})

it("shows a form to write an article when logged in", () => {
  localStorage.setItem("accessToken", "whatever")

  render(
    <MemoryRouter>
      <NewArticlePage />
    </MemoryRouter>,
  )

  expect(navigateSpy).not.toHaveBeenCalledWith("/")
})
