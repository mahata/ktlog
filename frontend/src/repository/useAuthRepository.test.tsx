import { renderHook } from "@testing-library/react"
import { useAuthRepository } from "./useAuthRepository"

const originalFetch = globalThis.fetch

describe("useAuthRepository", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  describe("isAuthed", () => {
    it("returns authed=true when backend API says the user is logged in", async () => {
      const stubResponse = { authed: true }

      globalThis.fetch = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify(stubResponse)))

      const { result } = renderHook(useAuthRepository)

      const response = await result.current.getAuthStatus()
      expect(response.success).toBe(true)
      expect(response.data.authed).toBe(true)

      expect(globalThis.fetch).toHaveBeenCalledWith("/api/v1/auth/status", {
        method: "GET",
      })
    })

    it("returns authed=false when backend API says the user is NOT logged in", async () => {
      const stubResponse = { authed: false }

      globalThis.fetch = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify(stubResponse)))

      const { result } = renderHook(useAuthRepository)

      const response = await result.current.getAuthStatus()
      expect(response.success).toBe(true)
      expect(response.data.authed).toBe(false)

      expect(globalThis.fetch).toHaveBeenCalledWith("/api/v1/auth/status", {
        method: "GET",
      })
    })
  })

  describe("authenticate", () => {
    it("returns accessToken and refreshToken when user is authed", async () => {
      const stubResponse = {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      }

      globalThis.fetch = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify(stubResponse), { status: 200 }))

      const { result } = renderHook(useAuthRepository)

      const response = await result.current.auth("john-doe@example.com", "password")
      expect(globalThis.fetch).toHaveBeenCalledWith("/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "john-doe@example.com",
          password: "password",
        }),
      })

      expect(response.success).toBe(true)
      expect(response.data.accessToken).toBe("accessToken")
      expect(response.data.refreshToken).toBe("refreshToken")
    })

    it("returns an error message when user is not authed", async () => {
      globalThis.fetch = vi.fn().mockResolvedValueOnce(
        new Response(JSON.stringify({ message: "Unauthorized" }), {
          status: 401,
        }),
      )

      const { result } = renderHook(useAuthRepository)

      const response = await result.current.auth("john-doe@example.com", "wrong-password")
      expect(globalThis.fetch).toHaveBeenCalledWith("/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "john-doe@example.com",
          password: "wrong-password",
        }),
      })

      expect(response.success).toBe(false)
      expect(response.data).toBeUndefined()
      expect(response.errorMessage).toBe("Invalid email or password: john-doe@example.com")
    })
  })
})
