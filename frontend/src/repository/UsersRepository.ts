export type User = {
  name: string | null;
  email: string | null;
};

export interface UsersRepository {
  getMe(): Promise<User>;
}

export class NetworkUsersRepository implements UsersRepository {
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
