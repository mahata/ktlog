import { App } from "@/App"
import { makeArticleFixture } from "@/fixture/makeArticleFixture"
import { useArticleRepository } from "@/repository/useArticleRepository"
import { useAuthRepository } from "@/repository/useAuthRepository"
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"

const originalTitle = document.title
const originalLocation = window.location

vi.mock("./repository/useArticleRepository")
vi.mock("./repository/useAuthRepository")

describe("App", () => {
  beforeEach(() => {
    vi.mocked(useArticleRepository).mockReturnValue({
      getAll: vi.fn().mockResolvedValueOnce([makeArticleFixture()]),
      get: vi.fn().mockResolvedValueOnce(makeArticleFixture()),
      post: vi.fn(),
    } satisfies ReturnType<typeof useArticleRepository>)
    vi.mocked(useAuthRepository).mockReturnValue({
      getAuthStatus: vi.fn().mockResolvedValueOnce({ success: true, data: { authed: false } }), // TODO: Put this into helper
      auth: vi.fn().mockResolvedValueOnce({ success: true }),
    } satisfies ReturnType<typeof useAuthRepository>)
  })

  afterEach(() => {
    document.title = originalTitle
    window.location = originalLocation
  })

  it.each(["ktlog.local", "localhost", "127.0.0.1"])('adds "dev|" to the title when it runs on `%s`', async () => {
    render(<App />, {
      wrapper: MemoryRouter,
    })

    await waitFor(() => {
      expect(document.title).toBe(`dev|${originalTitle}`)
    })
  })

  it('do NOT add "dev|" when it is not running on the localhost', async () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { ...window.location, hostname: "www.example.com" },
    })

    await act(async () => {
      render(<App />, {
        wrapper: MemoryRouter,
      })
    })

    expect(document.title).toBe(originalTitle)
  })

  // Skipping this section since JSDOM can't handle <dialog />
  describe("Login Action", () => {
    it.skip("A LoginForm is shown when the 'login' button is clicked", async () => {
      await act(async () => {
        render(<App />, {
          wrapper: MemoryRouter,
        })
      })

      const loginButton = screen.getByRole("button", {
        name: "Login",
      }) as HTMLButtonElement

      await userEvent.click(loginButton)
      expect(await screen.findByRole("form")).toBeVisible()
    })

    it.skip("A LoginForm is closed when 'Send' button is clicked", async () => {
      await act(async () => {
        render(<App />, {
          wrapper: MemoryRouter,
        })
      })

      const loginButton = screen.getByRole("button", {
        name: "Login",
      }) as HTMLButtonElement

      await userEvent.click(loginButton)
      expect(await screen.findByLabelText("login-modal-title")).toBeInTheDocument()

      const loginModalTitle = screen.queryByLabelText("login-modal-title")
      expect(loginModalTitle).toBeInTheDocument()
      await userEvent.click(screen.getByRole("button", { name: "Send" }))

      await waitFor(() => {
        expect(loginModalTitle).not.toBeVisible()
      })
    })

    it.skip("A toast message is shown when 'Send' button is clicked", async () => {
      await act(async () => {
        render(<App />, {
          wrapper: MemoryRouter,
        })
      })

      const loginButton = screen.getByRole("button", {
        name: "Login",
      }) as HTMLButtonElement

      await userEvent.click(loginButton)
      expect(await screen.findByLabelText("login-modal-title")).toBeInTheDocument()
      await userEvent.click(screen.getByRole("button", { name: "Send" }))

      await waitFor(() => {
        expect(screen.getByRole("alert", { busy: false })).toBeVisible()
      })
    })

    it.skip("A toast message is closed after 6 seconds", async () => {
      vi.useFakeTimers()
      await act(async () => {
        render(<App />, {
          wrapper: MemoryRouter,
        })
      })

      const loginButton = screen.getByRole("button", {
        name: "Login",
      }) as HTMLButtonElement

      await userEvent.click(loginButton)
      expect(await screen.findByLabelText("login-modal-title")).toBeInTheDocument()
      await userEvent.click(screen.getByRole("button", { name: "Send" }))

      await waitFor(() => {
        expect(screen.getByRole("alert", { busy: false })).toBeVisible()
      })

      act(() => {
        vi.advanceTimersByTime(6_000)
      })

      await waitFor(() => {
        expect(screen.queryByRole("alert", { busy: false })).not.toBeVisible()
      })

      vi.useRealTimers()
    })
  })
})
