import { CsrfTokenManager } from "./CsrfTokenManager";

describe("CsrfTokenManager", () => {
	const mockedFetch = vi.fn();

	beforeEach(() => {
		mockedFetch.mockReset();

		localStorage.clear();
		globalThis.fetch = mockedFetch;
	});

	it("should fetch a new token if not present in localStorage", async () => {
		const expectedToken = "new_csrf_token";
		mockedFetch.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ token: expectedToken }),
		});

		const manager = new CsrfTokenManager();
		const token = await manager.getToken();

		expect(token).toBe(expectedToken);
		expect(mockedFetch).toHaveBeenCalledWith("/api/v1/csrf");
		expect(localStorage.getItem(CsrfTokenManager.TOKEN_STORAGE_KEY)).toBe(
			token,
		);
	});

	it("should return the token from localStorage if it exists", async () => {
		const existingToken = "existing_csrf_token";
		localStorage.setItem(CsrfTokenManager.TOKEN_STORAGE_KEY, existingToken);

		const manager = new CsrfTokenManager();
		const token = await manager.getToken();

		expect(token).toBe(existingToken);
		expect(mockedFetch).not.toHaveBeenCalled();
	});
});
