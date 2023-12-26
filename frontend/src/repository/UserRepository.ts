import { CsrfTokenManager } from "../CsrfTokenManager";
import { HttpError } from "../HttpError";

export type User = {
  email: string | null;
  uname: string | null;
};

export interface UserRepository {
  getMe(): Promise<User>;
  save(user: User): Promise<void>;
}

export class NetworkUserRepository implements UserRepository {
  private csrfTokenManager = new CsrfTokenManager();

  async getMe(): Promise<User> {
    const response = await fetch("/api/v1/users/me", {
      method: "GET",
    });
    if (!response.ok) {
      const text = await response.text();
      throw new HttpError(
        response.status,
        `HTTP error! status: ${response.status}, body: ${text}`,
      );
    }

    return response.json();
  }

  async save(user: User): Promise<void> {
    await this.postRequest(user);
  }

  private async postRequest(user: User): Promise<void> {
    const csrfToken = await this.csrfTokenManager.getToken();

    const request = async () => {
      return fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(user),
      });
    };
    let response = await request();

    if (response.status === 403) {
      // It's highly likely that the CSRF token got invalidated
      await this.csrfTokenManager.fetchNewToken();
      response = await request();
    }

    if (!response.ok) {
      const text = await response.text();
      throw new HttpError(
        response.status,
        `HTTP error! status: ${response.status}, body: ${text}`,
      );
    }
  }
}
