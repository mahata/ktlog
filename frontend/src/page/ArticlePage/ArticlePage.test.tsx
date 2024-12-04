import { makeArticleFixture } from "@/fixture/makeArticleFixture"
import { ArticlePage } from "@/page/ArticlePage/ArticlePage"
import { useArticleRepository } from "@/repository/useArticleRepository"
import { _useArticleRepository } from "@/test-helper/__mocks__/useArticleRepository"
import { render, screen } from "@testing-library/react"

vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useParams: vi.fn().mockReturnValue({ id: "00000000-0000-0000-0000-000000000000" }),
}))

vi.mock("@/repository/useArticleRepository", () => import("@/test-helper/__mocks__/useArticleRepository"))
vi.mock("@/component/EyeCatch/EyeCatch", () => import("@/test-helper/__mocks__/EyeCatch"))

describe("Article", () => {
  const originalGetMock = _useArticleRepository.getMock

  afterEach(() => {
    _useArticleRepository.getMock = originalGetMock
  })

  it("shows EyeCatch", async () => {
    render(<ArticlePage />)

    expect(await screen.findByTestId("EyeCatch")).toBeVisible()
  })

  it("shows an article", async () => {
    const stubArticle = makeArticleFixture({
      id: "00000000-0000-0000-0000-000000000000",
    })

    _useArticleRepository.getMock = vi.fn().mockResolvedValueOnce(stubArticle)
    render(<ArticlePage />)

    expect(await screen.findByText(stubArticle.title)).toBeVisible()
    expect(screen.getByText(stubArticle.content)).toBeVisible()
    expect(useArticleRepository().get).toBeCalledWith("00000000-0000-0000-0000-000000000000")
  })
})
