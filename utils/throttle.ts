type Callback = (...args: any[]) => void;

/**
 * Throttle a function so that it's only called at most once every `limit` milliseconds.
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends Callback>(func: T, limit: number): T {
	let inThrottle: boolean;
	let lastArgs: any;
	let lastThis: any;

	const throttled = function (this: any, ...args: any[]) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;

			setTimeout(() => {
				inThrottle = false;
				if (lastArgs) {
					throttled.apply(lastThis, lastArgs);
					lastArgs = null;
					lastThis = null;
				}
			}, limit);
		} else {
			lastArgs = args;
			lastThis = this;
		}
	};

	return throttled as T;
}
