import { Header } from "@/component/Header/Header"
import { _jotai } from "@/test-helper/__mocks__/jotai"
import { _useAuthRepository } from "@/test-helper/__mocks__/useAuthRepository"
import { createMockAtom } from "@/test-helper/stub"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"

vi.mock("@/repository/useAuthRepository", () => import("@/test-helper/__mocks__/useAuthRepository"))

describe("Header", () => {
  describe("Login", () => {
    const originalShowLoginModalAtomMock = _jotai.showLoginModalAtomMock
    const originalAuthMock = _useAuthRepository.authMock

    afterEach(() => {
      _jotai.showLoginModalAtomMock = originalShowLoginModalAtomMock
      _useAuthRepository.authMock = originalAuthMock
    })

    it("shows 'Post' button when the user is logged in", async () => {
      // @ts-ignore
      _jotai.showLoginModalAtomMock = createMockAtom(true, vi.fn())
      render(<Header />, {
        wrapper: MemoryRouter,
      })

      const postButton = await screen.findByRole("button", { name: "Post" })
      expect(postButton).toBeVisible()
    })
  })

  describe("Service Logo", () => {
    it("is in the header", async () => {
      render(<Header />, {
        wrapper: MemoryRouter,
      })

      const logo = await screen.findByRole("img", { name: "Site Logo" })

      expect(logo).toBeVisible()
    })

    it("is linked to '/'", async () => {
      render(<Header />, {
        wrapper: MemoryRouter,
      })

      const logoLink = (await screen.findByRole("link", {
        name: "Site Logo",
      })) as HTMLAnchorElement

      expect(logoLink).toBeVisible()
      expect(logoLink.href).toBe(`${window.location.origin}/`)
    })
  })
})
