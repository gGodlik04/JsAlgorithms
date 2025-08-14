// withoutLastCall
const throttle = (cb, timeout) => {
	const lastCallTime = null;

	return function (...args) {
		const now = Date.now();

		if (now - lastCallTime >= timeout) {
			lastCallTime = now;
			return cb(...args);
		}
	};
};

const throttleRightWithLastCall = (cb, timeout) => {
	let lastCallTime = 0;
	let timeoutKey = null;
	let lastArgs = null;
	let lastContext = null;
	let pendingResolve = null;

	return function (...args) {
		const now = Date.now();
		const timeSinceLastCall = now - lastCallTime;

		// Сохраняем контекст и аргументы для последующего вызова
		lastArgs = args;
		lastContext = this;

		if (timeSinceLastCall >= timeout) {
			// Если достаточно времени прошло - вызываем сразу
			if (timeoutKey) {
				clearTimeout(timeoutKey);
				timeoutKey = null;
			}
			lastCallTime = now;
			return new Promise((res) => res(cb.apply(this, args)));
		} else if (!timeoutKey) {
			// Если есть ожидающий вызов - планируем его на оставшееся время
			return new Promise((res) => {
				pendingResolve = res;
				timeoutKey = setTimeout(() => {
					lastCallTime = Date.now();
					timeoutKey = null;
					const result = cb.apply(lastContext, lastArgs);
					if (pendingResolve) pendingResolve(result);
					pendingResolve = null;
				}, timeout - timeSinceLastCall);
			});
		}

		// Если вызов происходит во время ожидания - возвращаем предыдущий промис
		return new Promise((res) => {
			if (pendingResolve) {
				const originalResolve = pendingResolve;
				pendingResolve = (result) => {
					originalResolve(result);
					res(result);
				};
			} else {
				res(undefined);
			}
		});
	};
};
