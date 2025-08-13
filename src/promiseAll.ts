export const promiseAllOwn = <T>(promises: Promise<T>[]): Promise<T[]> => {
	return new Promise((resolve, reject) => {
		const result: T[] = [];
		let countResolvedPromises = 0;

		promises.forEach((promise, index) => {
			promise.then((res) => {
				result[index] = res;
				countResolvedPromises++;

				if (countResolvedPromises === promises.length) {
					resolve(result);
				}
			}, reject);
		});
	});
};
