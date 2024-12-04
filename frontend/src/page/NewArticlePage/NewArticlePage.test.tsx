import { NewArticlePage } from "@/page/NewArticlePage/NewArticlePage"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router"

const navigateSpy = vi.fn()
vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useNavigate: () => navigateSpy,
}))

it.skip("redirects to login page when not logged in", () => {
  render(
    <MemoryRouter>
      <NewArticlePage />
    </MemoryRouter>,
  )

  expect(navigateSpy).toHaveBeenCalledWith("/")
})

afterEach(() => {
  localStorage.clear()
})
