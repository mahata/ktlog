export class CsrfTokenManager {
  static TOKEN_STORAGE_KEY = "csrfToken"

  async getToken(): Promise<string> {
    let token = localStorage.getItem(CsrfTokenManager.TOKEN_STORAGE_KEY)

    if (!token) {
      token = await this.fetchNewToken()
    }

    return token
  }

  async fetchNewToken(): Promise<string> {
    const response = await fetch("/api/v1/csrf")
    if (!response.ok) {
      throw new Error(`Failed to fetch CSRF token: ${response.status}`)
    }

    const { token } = await response.json()
    localStorage.setItem(CsrfTokenManager.TOKEN_STORAGE_KEY, token)
    return token
  }
}
