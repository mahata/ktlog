import { NetworkAuthRepository } from "./AuthRepository";

const originalFetch = globalThis.fetch;

describe("AuthRepository", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("authorize method authorizes user", async () => {
    const stubResponse = {
      accessToken: "access-token",
      refreshToken: "refresh-token",
    };

    const authRequest = {
      email: "john-doe@example.com",
      password: "password",
    };

    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(stubResponse)));

    const authRepository = new NetworkAuthRepository();
    const response = await authRepository.authorize(authRequest);

    expect(globalThis.fetch).toHaveBeenCalledWith(`/api/v1/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authRequest),
    });

    expect(response).toEqual(stubResponse);
  });
});
