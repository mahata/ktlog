import type { useArticleRepository } from "@/repository/useArticleRepository";
import { getSampleArticleList } from "@/test-helper/stub";

const testDoubles = {
	get: vi.fn(() => Promise.resolve(getSampleArticleList()[0])),
	getAllMock: vi.fn(() => Promise.resolve(getSampleArticleList())),
};

const useArticleRepositoryMock: () => ReturnType<typeof useArticleRepository> =
	vi.fn(() => ({
		getAll: testDoubles.getAllMock,
		get: testDoubles.get,
	}));

export {
	testDoubles as _useArticleRepository,
	useArticleRepositoryMock as useArticleRepository,
};
