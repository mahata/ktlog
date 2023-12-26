import { vi } from "vitest";
import { NetworkUserRepository } from "./UserRepository";
import { CsrfTokenManager } from "../CsrfTokenManager";

const originalFetch = globalThis.fetch;

describe("UserRepository", () => {
  it("getMe() returns the user's data", async () => {
    const stubResponse = {
      name: "Yasunori MAHATA",
      email: "mahata777@gmail.com",
    };

    const mockedFetch = vi.fn();
    mockedFetch.mockResolvedValue(new Response(JSON.stringify(stubResponse)));
    globalThis.fetch = mockedFetch;

    const userRepository = new NetworkUserRepository();
    const response = await userRepository.getMe();

    expect(mockedFetch).toHaveBeenCalledWith(`/api/v1/users/me`, {
      method: "GET",
    });
    expect(response).toEqual(stubResponse);
  });

  it("save() makes a POST request to the backend", async () => {
    const csrfToken = "DOES NOT REALLY MATTER";
    localStorage.setItem(CsrfTokenManager.TOKEN_STORAGE_KEY, csrfToken);

    const mockedFetch = vi.fn();
    mockedFetch.mockResolvedValue(new Response(""));
    globalThis.fetch = mockedFetch;

    const user = {
      email: "mahata777@gmail.com",
      uname: "mahata",
    };
    const userRepository = new NetworkUserRepository();
    await userRepository.save(user);

    expect(mockedFetch).toHaveBeenCalledWith("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify(user),
    });
  });

  afterEach(() => {
    localStorage.clear();
    globalThis.fetch = originalFetch;
  });
});
