/**
 * Converts a hex color to RGB components.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const sanitizedHex = hex.replace(/^#/, "");
	if (![3, 6].includes(sanitizedHex.length)) return null;

	const hex6 =
		sanitizedHex.length === 3
			? sanitizedHex
					.split("")
					.map((char) => char + char)
					.join("")
			: sanitizedHex;

	const bigint = parseInt(hex6, 16);
	return {
		r: (bigint >> 16) & 255,
		g: (bigint >> 8) & 255,
		b: bigint & 255,
	};
}

/**
 * Calculates relative luminance of an RGB color.
 */
function getLuminance({
	r,
	g,
	b,
}: {
	r: number;
	g: number;
	b: number;
}): number {
	const toLinear = (channel: number) => {
		const c = channel / 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	};
	const R = toLinear(r);
	const G = toLinear(g);
	const B = toLinear(b);

	return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates contrast ratio between two luminance values.
 */
function getContrastRatio(lum1: number, lum2: number): number {
	const L1 = Math.max(lum1, lum2);
	const L2 = Math.min(lum1, lum2);
	return (L1 + 0.05) / (L2 + 0.05);
}

/**
 * Returns a foreground color (black or white) that has better contrast with the given background color.
 */
export function getForegroundColor(backgroundHex: string): string {
	const rgb = hexToRgb(backgroundHex);
	if (!rgb) throw new Error("Invalid hex color");

	const bgLuminance = getLuminance(rgb);
	const whiteContrast = getContrastRatio(
		bgLuminance,
		getLuminance({ r: 255, g: 255, b: 255 })
	);
	const blackContrast = getContrastRatio(
		bgLuminance,
		getLuminance({ r: 0, g: 0, b: 0 })
	);

	// Return the color with higher contrast
	return whiteContrast >= blackContrast ? "#FFFFFF" : "#000000";
}
