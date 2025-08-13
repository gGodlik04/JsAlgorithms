type ResultPromiseAll<T> =
	| { status: "fullfiled"; value: T }
	| { status: "rejected"; reason: any };

const promiseAllSettledOwn = <T>(
	promises: Promise<T>[]
): Promise<ResultPromiseAll<T>[]> => {
	return new Promise((resolve) => {
		const result: ResultPromiseAll<T>[] = [];
		let countAwaitedPromises = 0;

		for (const [index, promise] of promises.entries()) {
			promise
				.then((res: T) => {
					result[index] = {
						status: "fullfiled",
						value: res,
					};
				})
				.catch((e) => {
					result[index] = {
						status: "rejected",
						reason: e,
					};
				})
				.finally(() => {
					if (++countAwaitedPromises === promises.length) {
						resolve(result);
					}
				});
		}
	});
};
