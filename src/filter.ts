const filterOwn = <T>(
	array: T[],
	callback: (elem: T, index: number, array: T[]) => boolean,
	thisArg?: any
): T[] => {
	return array.reduce<T[]>((acc, el, index, array) => {
		const callbackResult = thisArg
			? callback.call(thisArg, el, index, array)
			: callback(el, index, array);

		if (callbackResult) {
			acc.push(el);
		}
		return acc;
	}, []);
};

const array = [4, 2, 5, 6, 2];

const result = filterOwn(array, (el) => {
	return el % 2 === 0;
});
console.log(result);
