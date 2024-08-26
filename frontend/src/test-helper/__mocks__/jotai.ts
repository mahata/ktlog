import { authedAtom, showLoginModalAtom, toastMessageAtom } from "@/atoms";
import { type Setter, createMockAtom } from "@/test-helper/stub";
import * as jotai from "jotai";
import type { Atom } from "jotai/index";

vi.mock("jotai");

const testDoubles = {
	showLoginModalAtomMock: createMockAtom(
		false,
		vi.fn() satisfies Setter<boolean>,
	),
	toastMessageAtomMock: createMockAtom("", vi.fn() satisfies Setter<string>),
	authedAtomMock: createMockAtom(false, vi.fn() satisfies Setter<boolean>),
};

const atom = vi.mocked(jotai.atom);

const useAtom = vi
	.mocked(jotai.useAtom)
	// @ts-expect-error Because TS doesn't like Atom<unknown>
	.mockImplementation((atom: Atom<unknown>) => {
		if (atom === showLoginModalAtom) return testDoubles.showLoginModalAtomMock;
		if (atom === toastMessageAtom) return testDoubles.toastMessageAtomMock;
		if (atom === authedAtom) return testDoubles.authedAtomMock;
		throw new Error("Unexpected atom");
	});

export { testDoubles as _jotai, useAtom, atom };
