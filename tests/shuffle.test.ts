import { describe, it, expect } from "vitest";
import { mulberry32, shuffleInPlace } from "../src/util/shuffle";

describe("mulberry32", () => {
	it("is deterministic for the same seed", () => {
		const a = mulberry32(42), b = mulberry32(42);
		expect([a(), a(), a()]).toEqual([b(), b(), b()]);
	});
	it("produces values in [0, 1)", () => {
		const r = mulberry32(7);
		for (let i = 0; i < 100; i++) {
			const v = r();
			expect(v).toBeGreaterThanOrEqual(0);
			expect(v).toBeLessThan(1);
		}
	});
});

describe("shuffleInPlace", () => {
	const base = () => Array.from({ length: 10 }, (_, i) => i);
	it("keeps exactly the same elements", () => {
		const arr = shuffleInPlace(base(), mulberry32(1));
		expect([...arr].sort((x, y) => x - y)).toEqual(base());
	});
	it("is deterministic for the same seed", () => {
		expect(shuffleInPlace(base(), mulberry32(5))).toEqual(shuffleInPlace(base(), mulberry32(5)));
	});
	it("differs across different seeds", () => {
		expect(shuffleInPlace(base(), mulberry32(1))).not.toEqual(shuffleInPlace(base(), mulberry32(2)));
	});
});
