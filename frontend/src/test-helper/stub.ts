export type Setter<T> = (value: T) => void;

export function createMockAtom<T>(value: T, setter: Setter<T>): [T, Setter<T>] {
	return [value, vi.fn().mockImplementation(setter)];
}

export const mockedShowLoginModalAtom = createMockAtom(
	true,
	vi.fn() satisfies Setter<boolean>,
);

export const mockedToastMessageAtom = createMockAtom(
	"",
	vi.fn() satisfies Setter<string>,
);

export const mockedAuthedAtom = createMockAtom(
	false,
	vi.fn() satisfies Setter<boolean>,
);
