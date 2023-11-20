import { vi } from "vitest";
import { NetworkUsersRepository } from "./UsersRepository";

const originalFetch = global.fetch;

describe("UsersRepository", () => {
  it("getMe() returns the user's data", async () => {
    const stubResponse = {
      name: "Yasunori MAHATA",
      email: "mahata777@gmail.com",
    };

    const mockedFetch = vi.fn();
    mockedFetch.mockResolvedValue(new Response(JSON.stringify(stubResponse)));
    global.fetch = mockedFetch;

    const usersRepository = new NetworkUsersRepository();
    const response = await usersRepository.getMe();

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
