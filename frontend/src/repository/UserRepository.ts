export type User = {
  name: string | null;
  email: string | null;
};

export interface UserRepository {
  getMe(): Promise<User>;
}

export class NetworkUserRepository implements UserRepository {
  async getMe(): Promise<User> {
    const response = await fetch("/api/v1/users/me", {
      method: "GET",
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    return response.json();
  }
}
