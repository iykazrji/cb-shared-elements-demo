export function hexToRgba(hex: string, alpha: number = 1): string {
	let r: number, g: number, b: number;

	if (hex.startsWith("#")) {
		hex = hex.slice(1);
	}

	if (hex.length === 3) {
		hex = hex
			.split("")
			.map((char) => char + char)
			.join("");
	}

	if (hex.length === 6) {
		r = parseInt(hex.slice(0, 2), 16);
		g = parseInt(hex.slice(2, 4), 16);
		b = parseInt(hex.slice(4, 6), 16);
	} else {
		throw new Error("Invalid hex color format");
	}

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
