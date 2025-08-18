const compose = (...argCallbacks) => {
	return function (arg) {
		return argCallbacks.reverse().reduce((acc, cb) => {
			acc = cb(acc);
			return acc;
		}, arg);
	};
};

const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;

const composed = compose(add1, mul3, div2);
console.log(composed(4)); // 7
