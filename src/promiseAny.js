const promiseAny = (promises) => {
	return new Promise((resolve, reject) => {
		let result = [];
		let count = 0;

		promises.forEach((promise, index) => {
			promise
				.then((res) => {
					resolve(res);
				})
				.catch((e) => {
					result[index] = e;
					count++;

					if (count === promises.length) {
						reject(result);
					}
				});
		});
	});
};

const test = new Promise((res, rej) => {
	setTimeout(() => {
		rej(1);
	}, 500);
});

const test2 = new Promise((res, rej) => {
	setTimeout(() => {
		rej(2);
	}, 300);
});

const test3 = new Promise((res, rej) => {
	setTimeout(() => {
		rej(3);
	}, 400);
});

const test5 = async () => {
	const test6 = await promiseAny([test, test2, test3]);
	return test6;
};
const test7 = await test5();
console.log(test7);
