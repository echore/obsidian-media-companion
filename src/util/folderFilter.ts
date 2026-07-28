/**
 * Returns whether a vault-relative file path lies within any of the given
 * folders. An empty folder list means no restriction (include everything),
 * which preserves the plugin's default behavior.
 */
export function isWithinFolders(path: string, folders: string[]): boolean {
	if (folders.length === 0) return true;
	return folders.some(folder => path === folder || path.startsWith(`${folder}/`));
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
