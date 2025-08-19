// Реализуй функцию, которая принимает другую функцию и возвращает её "обёрнутую" версию, гарантирующую, что оригинальная функция будет вызвана только один раз, при любых повторных вызовах будет возвращаться результат первого вызова.

const once = (func) => {
	if (typeof func !== "function")
		throw new TypeError("Type of arg should be function");

	let isOnceCalled = false;
	let resultOfCall = null;

	return function (...args) {
		if (isOnceCalled) {
			return resultOfCall;
		}

		isOnceCalled = true;
		return (resultOfCall = func.apply(this, args));
	};
};

const test = (arg) => {
	return arg * 2;
};

const onceTest = once(test);

console.log(onceTest(2));
console.log(onceTest(3));
console.log(onceTest(5));

//////

const server = {
	isInitialized: false,
	name: "MyServer",
	init(config) {
		console.log(`Initializing server ${this.name} with port ${config.port}`);
		this.isInitialized = true;
		return this.isInitialized;
	},
};

server.initOnce = onceWithContext(server.init);
server.initOnce({ port: 3000 }); // this = server → всё ок
