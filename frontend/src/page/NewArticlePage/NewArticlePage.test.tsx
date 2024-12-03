import { NewArticlePage } from "@/page/NewArticlePage/NewArticlePage"
import { render, screen } from "@testing-library/react"

it("redirects to login page when not logged in", () => {
  render(<NewArticlePage />)
  expect(screen.getByText("New Article")).toBeVisible()
})
