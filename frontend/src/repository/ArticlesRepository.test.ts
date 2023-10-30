import { vi } from "vitest";

const originalFetch = global.fetch;

describe("ArticlesRepository", () => {
  it("WIP: getAll() returns data of Article[]", () => {
    expect(1).toBe(1);
  });

  afterEach(() => {
    if (vi.isMockFunction(global.fetch)) {
      global.fetch = originalFetch;
    }
  });
});
