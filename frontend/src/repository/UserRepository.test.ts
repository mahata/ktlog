import { vi } from "vitest";
import { NetworkUserRepository } from "./UserRepository";

const originalFetch = global.fetch;

describe("UserRepository", () => {
  it("getMe() returns the user's data", async () => {
    const stubResponse = {
      name: "Yasunori MAHATA",
      email: "mahata777@gmail.com",
    };

    const mockedFetch = vi.fn();
    mockedFetch.mockResolvedValue(new Response(JSON.stringify(stubResponse)));
    global.fetch = mockedFetch;

    const userRepository = new NetworkUserRepository();
    const response = await userRepository.getMe();

    expect(mockedFetch).toHaveBeenCalledWith(`/api/v1/users/me`, {
      method: "GET",
    });
    expect(response).toEqual(stubResponse);
  });

  afterEach(() => {
    if (vi.isMockFunction(global.fetch)) {
      global.fetch = originalFetch;
    }
  });
});
