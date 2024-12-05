import { ArticleForm } from "@/component/Form/ArticleForm"
import { _useArticleRepository } from "@/test-helper/__mocks__/useArticleRepository"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

vi.mock("@/repository/useArticleRepository", () => import("@/test-helper/__mocks__/useArticleRepository"))

const navigateSpy = vi.fn()
vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useNavigate: () => navigateSpy,
}))

afterEach(() => {
  vi.clearAllMocks()
})

it("shows fields and submit button", () => {
  render(<ArticleForm />)

  expect(screen.getByLabelText("Title")).toBeVisible()
  expect(screen.getByLabelText("Content")).toBeVisible()
  expect(screen.getByRole("button", { name: "Post" })).toBeVisible()
})

it.skip("makes post button active only when title or content is not empty", () => {})

it("sends an HTTP request when post button is clicked with title and/or content", async () => {
  render(<ArticleForm />)

  await userEvent.type(screen.getByLabelText("Title"), "my title")
  await userEvent.type(screen.getByLabelText("Content"), "my content")
  await userEvent.click(screen.getByRole("button", { name: "Post" }))

  expect(_useArticleRepository.postMock).toHaveBeenCalledWith("my title", "my content")
})

it("refreshes the page after calling POST API with article data", async () => {
  render(<ArticleForm />)

  await userEvent.type(screen.getByLabelText("Title"), "my title")
  await userEvent.type(screen.getByLabelText("Content"), "my content")
  await userEvent.click(screen.getByRole("button", { name: "Post" }))

  expect(navigateSpy).toHaveBeenCalledWith(0)
})

it.skip("shows error message when article API returns error message", () => {
  render(<ArticleForm />)
})
