export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export interface AuthRepository {
  authorize(authRequest: AuthRequest): Promise<AuthResponse>;
}

export class NetworkAuthRepository implements AuthRepository {
  async authorize(authRequest: AuthRequest): Promise<AuthResponse> {
    const response = await fetch("/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authRequest.email,
        password: authRequest.password,
      }),
    });

    return response.json();
  }
}
