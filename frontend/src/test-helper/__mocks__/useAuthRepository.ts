import type { useAuthRepository } from "@/repository/useAuthRepository";

const testDoubles = {
	getAuthStatusMock: vi.fn(() =>
		Promise.resolve({
			success: true,
			data: {
				authed: true,
			},
		}),
	),
	authMock: vi.fn(() => Promise.resolve({ success: true })),
};

const useAuthRepositoryMock: () => ReturnType<typeof useAuthRepository> = vi.fn(
	() => ({
		getAuthStatus: testDoubles.getAuthStatusMock,
		auth: testDoubles.authMock,
	}),
);

export {
	testDoubles as _useAuthRepository,
	useAuthRepositoryMock as useAuthRepository,
};
