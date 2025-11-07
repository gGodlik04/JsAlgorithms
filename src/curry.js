// Реализуй функцию curry(fn), которая преобразует обычную функцию в каррированную, т.е. её можно вызывать по частям:

const curry = (func) => {
	const curryFunc = (...args) => {
		if (args.length >= func.length) {
			return func(...args);
		}
		return (...nextArgs) => curryFunc(...args, ...nextArgs);
	};
	return curryFunc;
};

const curry = (func) => {
	const curryFunc = function (...args) {
		if (func.length <= args.length) {
			return func(...args);
		}
		return curryFunc.bind(this, ...args);
	};

	return curryFunc;
};

const curry = (f, ...args) =>
	f.length <= args.length
		? f(...args)
		: (...next) => curry(f, ...args, ...next);

const sum = (a, b, c) => a + b + c;
const currySum = curry(sum);

console.log(currySum(1, 2, 3)); // 6
console.log(currySum(1, 2)(3)); // 6
console.log(currySum(1)(2)(3)); // 6
