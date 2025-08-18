export const promiseAllOwn = <T>(promises: Promise<T>[]): Promise<T[]> => {
	return new Promise((resolve, reject) => {
		const result: T[] = [];
		let countResolvedPromises = 0;

		if (promises.length === 0) {
			resolve([]);
			return;
		}

		promises.forEach((promise, index) => {
			Promise.resolve(promise).then((res) => {
				result[index] = res;
				countResolvedPromises++;

				if (countResolvedPromises === promises.length) {
					resolve(result);
				}
			}, reject);
		});
	});
};
