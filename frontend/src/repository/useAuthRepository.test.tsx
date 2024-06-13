import { vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAuthRepository } from "./useAuthRepository";

const originalFetch = globalThis.fetch;

describe("isAuthed", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns authed=true when backend API says the user is logged in", async () => {
    const stubResponse = { authed: true };

    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(stubResponse)));

    const { result } = renderHook(useAuthRepository);

    const response = await result.current.isAuthed();
    expect(response.authed).toEqual(true);

    expect(globalThis.fetch).toHaveBeenCalledWith("/api/v1/auth/status", {
      method: "GET",
    });
  });

  it("returns authed=false when backend API says the user is NOT logged in", async () => {
    const stubResponse = { authed: false };

    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(stubResponse)));

    const { result } = renderHook(useAuthRepository);

    const response = await result.current.isAuthed();
    expect(response.authed).toEqual(false);

    expect(globalThis.fetch).toHaveBeenCalledWith("/api/v1/auth/status", {
      method: "GET",
    });
  });
});
