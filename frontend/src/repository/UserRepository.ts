export type User = {
  email: string | null;
  uname: string | null;
};

export interface UserRepository {
  getMe(): Promise<User>;
  save(user: User): Promise<void>;
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

  async save(user: User): Promise<void> {
    const response = await fetch("/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }
  }
}
