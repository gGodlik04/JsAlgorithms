const debounce = (cb, timeout) => {
	let timeoutKey = null;

	return function (...args) {
		clearTimeout(timeoutKey);

		return new Promise((resolve) => {
			timeoutKey = setTimeout(() => {
				resolve(cb(...args));
			}, timeout);
		});
	};
};
