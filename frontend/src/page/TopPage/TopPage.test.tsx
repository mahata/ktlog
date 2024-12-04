import { makeArticleFixture } from "@/fixture/makeArticleFixture"
import { _useArticleRepository } from "@/test-helper/__mocks__/useArticleRepository"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { ArticlePage } from "../ArticlePage/ArticlePage"
import { TopPage } from "./TopPage"

vi.mock("@/repository/useArticleRepository", () => import("@/test-helper/__mocks__/useArticleRepository"))
vi.mock("@/component/EyeCatch/EyeCatch", () => import("@/test-helper/__mocks__/EyeCatch"))

describe("TopPage", () => {
  const originalGetAllMock = _useArticleRepository.getAllMock

  afterEach(() => {
    _useArticleRepository.getAllMock = originalGetAllMock
  })

  it("shows EyeCatch", async () => {
    render(<ArticlePage />)

    expect(await screen.findByTestId("EyeCatch")).toBeVisible()
  })

  it("shows 'TopPage' header", async () => {
    render(<TopPage />, {
      wrapper: MemoryRouter,
    })

    expect(await screen.findByText("Articles")).toBeVisible()
  })

  it("shows all articles", async () => {
    const articleId = "00000000-0000-0000-0000-000000000000"
    const stubArticle = makeArticleFixture({
      id: articleId,
    })

    _useArticleRepository.getAllMock = vi.fn().mockResolvedValueOnce([stubArticle])

    render(<TopPage />, {
      wrapper: MemoryRouter,
    })

    const articleLink = (await screen.findByRole("link", {
      name: stubArticle.title,
    })) as HTMLAnchorElement

    expect(articleLink).toBeVisible()
    expect(articleLink.href).toBe(`${window.location.origin}/articles/${articleId}`)

    expect(screen.getByText(stubArticle.content)).toBeVisible()
  })

  it("strips article contents when it's more than 200 chars", async () => {
    _useArticleRepository.getAllMock = vi.fn().mockResolvedValueOnce([
      makeArticleFixture({
        id: "00000000-0000-0000-0000-000000000000",
        content: "x".repeat(200),
      }),
      makeArticleFixture({
        id: "00000000-0000-0000-0000-000000000001",
        content: "y".repeat(201),
      }),
    ])

    render(<TopPage />, {
      wrapper: MemoryRouter,
    })

    await screen.findByText("x".repeat(200))
    expect(screen.getByText(`${"y".repeat(200)}...`))
  })
})
