export class CsrfTokenManager {
  static TOKEN_STORAGE_KEY = "csrfToken";

  async getToken(): Promise<string> {
    let token = localStorage.getItem(CsrfTokenManager.TOKEN_STORAGE_KEY);

    if (!token) {
      token = await this.fetchNewToken();
      localStorage.setItem(CsrfTokenManager.TOKEN_STORAGE_KEY, token);
    }

    return token;
  }

  async fetchNewToken(): Promise<string> {
    const response = await fetch("/api/v1/csrf");
    if (!response.ok) {
      throw new Error(`Failed to fetch CSRF token: ${response.status}`);
    }

    const data = await response.json();
    return data.token;
  }
}
3;
