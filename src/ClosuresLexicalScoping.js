// 1

const obj = {
	value: 10,
	getValue: function () {
		return () => this.value * 2;
	},
};

const fn = obj.getValue();
const fn2 = fn;

console.log(fn()); // ?
console.log(fn2()); // ?

// 2

function createCounters() {
	const counters = [];
	for (var i = 0; i < 3; i++) {
		counters.push(function () {
			return i;
		});
	}
	return counters;
}

const arr = createCounters();

console.log(arr[0]()); // ?
console.log(arr[1]()); // ?
console.log(arr[2]()); // ?

// 3

const obj = {
	value: 100,
	getFunc: function () {
		return function () {
			return this.value + 1;
		};
	},
};

const fn = obj.getFunc();
console.log(fn()); // ?
console.log(fn.call(obj)); // ?

// 4

function makeAsync() {
	let count = 0;
	return async function () {
		count++;
		await new Promise((r) => setTimeout(r, 10));
		return count;
	};
}

const fn = makeAsync();

fn().then(console.log); // ?
fn().then(console.log); // ?
fn().then(console.log); // ?

// 5

function tricky() {
	console.log(a); // ?
	var a = 10;
	return function () {
		return a;
	};
}

const fn = tricky();
console.log(fn()); // ?

// 6

function create() {
	let secret = "hidden";
	return {
		getSecret: function () {
			return secret;
		},
		setSecret: function (val) {
			secret = val;
		},
	};
}

const obj1 = create();
const obj2 = create();

obj1.setSecret("obj1");
obj2.setSecret("obj2");

console.log(obj1.getSecret()); // ?
console.log(obj2.getSecret()); // ?

// 7

const obj = {
	x: 1,
	getX: function () {
		return function () {
			return this.x;
		}.bind({ x: 42 });
	},
};

const fn = obj.getX();
console.log(fn()); // ?

// 8

function Counter() {
	let value = 0;
	return {
		inc: () => ++value,
		dec: () => --value,
		get: () => value,
	};
}

const c1 = Counter();
const c2 = Counter();

c1.inc();
c1.inc();
c2.dec();

console.log(c1.get()); // ?
console.log(c2.get()); // ?

// 9

const obj = {
	value: 10,
	method: function () {
		return () => {
			return function () {
				return this.value;
			}.bind({ value: this.value * 2 })();
		};
	},
};

const fn = obj.method();
console.log(fn()); // ?

// 10

function trickyLoop() {
	const results = [];

	for (var i = 0; i < 3; i++) {
		setTimeout(() => results.push(i), 0);
	}

	for (let j = 0; j < 3; j++) {
		setTimeout(() => results.push(j), 0);
	}

	return results;
}

console.log(trickyLoop()); // ?
setTimeout(() => console.log("Later:", trickyLoop()), 50);

//11

function asyncClosure() {
	let x = 0;
	return [
		async () => {
			x++;
			await Promise.resolve();
			return x;
		},
		() => x,
	];
}

const [f1, f2] = asyncClosure();

f1().then(console.log); // ?
f1().then(console.log); // ?
console.log(f2()); // ?

// 12

function factory() {
	var hidden = 5;
	return {
		get: () => hidden,
		inc: () => hidden++,
		tricky: function () {
			return function () {
				return hidden;
			};
		},
	};
}

const obj1 = factory();
const obj2 = factory();

obj1.inc();
obj1.inc();

console.log(obj1.get()); // ?
console.log(obj2.get()); // ?
console.log(obj1.tricky()()); // ?

// 13

const obj = {
	value: 1,
	make: function () {
		return () => {
			setTimeout(
				function () {
					console.log(this.value);
				}.bind({ value: this.value + 10 }),
				0
			);
		};
	},
};

const fn = obj.make();
fn();

//14

async function loop() {
	const results = [];

	for (var i = 0; i < 3; i++) {
		results.push(
			(async () => {
				await Promise.resolve();
				return i;
			})()
		);
	}

	for (let j = 0; j < 3; j++) {
		results.push(
			(async () => {
				await Promise.resolve();
				return j;
			})()
		);
	}

	return Promise.all(results);
}

loop().then(console.log);

//15

function create() {
	const arr = [];
	for (let i = 0; i < 3; i++) {
		setTimeout(() => arr.push(i), 0);
	}
	return arr;
}

const a1 = create();
const a2 = create();

setTimeout(() => {
	console.log("a1:", a1);
	console.log("a2:", a2);
}, 10);

//16

const obj = {
	x: 5,
	getAsync: function () {
		return async function () {
			await Promise.resolve();
			return this.x * 2;
		}.bind({ x: this.x + 1 });
	},
};

const fn = obj.getAsync();
fn().then(console.log);

//17

function factory() {
	var hidden = 0;
	return {
		inc: () => hidden++,
		get: () => hidden,
		tricky: function () {
			return () => {
				setTimeout(() => console.log("hidden:", hidden), 0);
				return () => ++hidden;
			};
		},
	};
}

const f1 = factory();
const f2 = factory();

f1.inc(); // hidden = 1 (у f1)
f1.tricky()()(); // setTimeout поставлен (логнёт hidden позже), сразу вернули функцию, которая увеличивает hidden → hidden=2
f2.tricky()()(); // у f2 hidden = 0 → setTimeout логнёт позже, потом ++hidden = 1
console.log("sync:", f1.get(), f2.get());

//18

function Tower() {
	this.value = 1;
	var hidden = 0;

	this.inc = () => {
		hidden++;
		this.value++;
	};

	this.run = async function () {
		for (var i = 0; i < 2; i++) {
			setTimeout(() => console.log("timeout-var:", i, hidden, this.value), 0);
		}
		for (let j = 0; j < 2; j++) {
			setTimeout(() => console.log("timeout-let:", j, hidden, this.value), 0);
		}

		hidden += 2;
		this.value += 2;

		await Promise.resolve();

		return [hidden, this.value];
	};
}

const t = new Tower();
t.inc();
t.run().then(console.log);

//19

function createFactory(mult) {
	const arr = [];
	return {
		pushLater: function () {
			for (var i = 0; i < 2; i++) {
				setTimeout(() => arr.push(i * mult), 0);
			}
			for (let j = 0; j < 2; j++) {
				setTimeout(() => arr.push(j * mult), 0);
			}
		},
		getAsync: async function () {
			await Promise.resolve();
			return arr;
		}.bind({ arr: ["shadow"] }),
	};
}

const f1 = createFactory(1);
const f2 = createFactory(10);

f1.pushLater();
f2.pushLater();

setTimeout(async () => {
	console.log("f1:", await f1.getAsync());
	console.log("f2:", await f2.getAsync());
}, 50);
