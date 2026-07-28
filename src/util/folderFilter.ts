/**
 * Returns whether a vault-relative file path lies within any of the given
 * folders. Matching is case-insensitive. An empty folder list means no
 * restriction (include everything), which preserves the plugin's default
 * behavior.
 */
export function isWithinFolders(path: string, folders: string[]): boolean {
	if (folders.length === 0) return true;
	const lowerPath = path.toLowerCase();
	return folders.some(folder => {
		const lowerFolder = folder.toLowerCase();
		return lowerPath === lowerFolder || lowerPath.startsWith(`${lowerFolder}/`);
	});
}

/**
 * Parses the raw settings text (comma or newline separated) into a
 * normalized folder list: trimmed, leading/trailing slashes removed,
 * empty entries dropped.
 */
export function normalizeFolders(raw: string): string[] {
	return raw.split(/[\n,]/)
		.map(part => part.trim())
		.map(part => part.replace(/^\/+|\/+$/g, ""))
		.filter(part => part.length > 0);
}
