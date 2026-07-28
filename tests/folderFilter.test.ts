import { describe, it, expect } from "vitest";
import { isWithinFolders, normalizeFolders } from "../src/util/folderFilter";

describe("isWithinFolders", () => {
	it("includes everything when whitelist is empty", () => {
		expect(isWithinFolders("anywhere/a.png", [])).toBe(true);
		expect(isWithinFolders("root.png", [])).toBe(true);
	});
	it("includes direct children of a whitelisted folder", () => {
		expect(isWithinFolders("灵感库/a.png", ["灵感库"])).toBe(true);
	});
	it("includes nested descendants", () => {
		expect(isWithinFolders("灵感库/sub/deep/b.png", ["灵感库"])).toBe(true);
	});
	it("excludes files in other folders", () => {
		expect(isWithinFolders("Images/c.png", ["灵感库"])).toBe(false);
	});
	it("does not match sibling folders sharing a name prefix", () => {
		expect(isWithinFolders("灵感库2/d.png", ["灵感库"])).toBe(false);
	});
	it("excludes root-level files when whitelist is non-empty", () => {
		expect(isWithinFolders("root.png", ["灵感库"])).toBe(false);
	});
	it("supports multiple folders", () => {
		expect(isWithinFolders("refs/e.png", ["灵感库", "refs"])).toBe(true);
	});
	it("matches case-insensitively", () => {
		expect(isWithinFolders("Inspiration/a.png", ["inspiration"])).toBe(true);
	});
	it("matches unicode paths regardless of case-insensitivity", () => {
		expect(isWithinFolders("灵感库/a.png", ["灵感库"])).toBe(true);
	});
});

describe("normalizeFolders", () => {
	it("splits on commas and newlines, trims, strips slashes, drops empties", () => {
		expect(normalizeFolders(" 灵感库/ ,\n/refs/sub/,, ")).toEqual(["灵感库", "refs/sub"]);
	});
	it("returns [] for blank input", () => {
		expect(normalizeFolders("   \n ")).toEqual([]);
	});
});
