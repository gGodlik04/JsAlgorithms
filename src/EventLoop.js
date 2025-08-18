// 1

console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// 2

console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
	.then(() => console.log("C"))
	.then(() => console.log("D"));

console.log("E");

//3

async function async1() {
	console.log("async1 start");
	await async2();
	console.log("async1 end");
}

async function async2() {
	console.log("async2");
}

console.log("script start");

setTimeout(() => console.log("setTimeout"), 0);

async1();

Promise.resolve().then(() => console.log("promise1"));

console.log("script end");

// 4

console.log("tick1");

setTimeout(() => console.log("timeout1"), 0);

queueMicrotask(() => console.log("microtask1"));

Promise.resolve().then(() => {
	console.log("promise2");
	queueMicrotask(() => console.log("microtask2"));
});

console.log("tick2");

//5

console.log("start");

setTimeout(() => console.log("timeout A"), 0);

Promise.resolve().then(() => {
	console.log("promise A");
	setTimeout(() => console.log("timeout B"), 0);
});

async function foo() {
	console.log("async foo start");
	await Promise.resolve();
	console.log("async foo end");
}

foo();

console.log("end");

// 6

console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
setTimeout(() => console.log(5), 0);

// 7

console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve()
	.then(() => console.log(3))
	.then(() => console.log(4));
console.log(5);

// 8

async function f1() {
	console.log(1);
	await f2();
	console.log(2);
}
async function f2() {
	console.log(3);
}

console.log(4);
setTimeout(() => console.log(5), 0);
f1();
Promise.resolve().then(() => console.log(6));
console.log(7);

// 9

console.log(1);
queueMicrotask(() => console.log(2));
setTimeout(() => console.log(3), 0);
Promise.resolve().then(() => {
	console.log(4);
	queueMicrotask(() => console.log(5));
});
console.log(6);

// 10

console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => {
	console.log(3);
	setTimeout(() => console.log(4), 0);
});
async function foo() {
	console.log(5);
	await Promise.resolve();
	console.log(6);
}
foo();
console.log(7);

// 11

console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve()
	.then(() => {
		console.log(3);
		return Promise.resolve(4);
	})
	.then((x) => console.log(x));

queueMicrotask(() => console.log(5));

console.log(6);

//12

console.log(1);

setTimeout(() => console.log(2), 0);

new Promise((res, rej) => {
	console.log(3);
	res(4);
}).then((x) => console.log(x));

async function foo() {
	console.log(5);
	await Promise.resolve(6);
	console.log(7);
}

foo();

console.log(8);

//13

console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve(3)
	.then((x) => {
		console.log(x);
		return new Promise((res) => {
			console.log(4);
			res(5);
		});
	})
	.then((x) => console.log(x));

console.log(6);

//14

console.log(1);

setTimeout(() => console.log(2), 0);

queueMicrotask(() => console.log(3));

async function bar() {
	console.log(4);
	await new Promise((res) => setTimeout(res, 0));
	console.log(5);
}

bar();

console.log(6);

// 15

console.log(1);

setTimeout(() => console.log(2), 0);

new Promise((res) => {
	console.log(3);
	res(4);
}).then((x) => {
	console.log(x);
	setTimeout(() => console.log(5), 0);
});

async function foo() {
	console.log(6);
	await Promise.resolve();
	console.log(7);
}

foo();

console.log(8);

// 16

console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve()
	.then(() => {
		console.log(3);
		queueMicrotask(() => console.log(4));
		return Promise.resolve(5);
	})
	.then((x) => console.log(x));

queueMicrotask(() => console.log(6));

console.log(7);

// 17

console.log(1);

async function foo() {
	console.log(2);
	await Promise.resolve(3);
	console.log(4);
	return 5;
}

foo().then((x) => console.log(x));

Promise.resolve().then(() => {
	console.log(6);
	return Promise.resolve(7).then((y) => console.log(y));
});

setTimeout(() => console.log(8), 0);

console.log(9);

// 18

console.log(1);

Promise.resolve()
	.then(() => {
		console.log(2);
		return Promise.resolve(3).then(() => {
			console.log(4);
			return 5;
		});
	})
	.then((x) => console.log(x));

queueMicrotask(() => console.log(6));

setTimeout(() => console.log(7), 0);

console.log(8);

// 19

console.log(1);

async function bar() {
	console.log(2);
	await new Promise((res) => {
		console.log(3);
		res(4);
	});
	console.log(5);
}

bar();

Promise.resolve().then(() => {
	console.log(6);
	queueMicrotask(() => console.log(7));
});

setTimeout(() => console.log(8), 0);

console.log(9);

// 20

console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve(3)
	.then((x) => {
		console.log(x);
		return Promise.resolve(4).then((y) => {
			console.log(y);
			queueMicrotask(() => console.log(5));
		});
	})
	.then(() => console.log(6));

queueMicrotask(() => console.log(7));

async function foo() {
	console.log(8);
	await Promise.resolve(9);
	console.log(10);
}

foo();

console.log(11);
