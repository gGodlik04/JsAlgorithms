// 1

const a = 1;

const obj = {
	a: 2,
	fn1: function () {
		const fn2 = () => console.log(this.a);
		return function () {
			fn2();
		};
	},
};

const fn = obj.fn1();
fn();

// 2

const obj = {
	value: 10,
	method: function () {
		setTimeout(function () {
			console.log(this.value);
		}, 0);

		setTimeout(() => {
			console.log(this.value);
		}, 0);
	},
};

obj.method();

// 3

function Foo(n) {
	this.n = n;
	return () => console.log(this.n);
}

const f = new Foo(7);
f();

// 4

function Bar() {
	this.x = 5;
	return function () {
		console.log(this.x);
	};
}

const b = new Bar();
b();

// 5

const obj = {
	x: 1,
	getX: function () {
		return function () {
			return this.x;
		}.bind({ x: 100 });
	},
};

console.log(obj.getX()());

// 6

const obj = {
	y: 20,
	outer: function () {
		return () => {
			return function () {
				console.log(this.y);
			};
		};
	},
};

const fn = obj.outer()();
fn();

// 7

const obj = {
	z: 50,
	foo: function () {
		const bar = () => console.log(this.z);
		(function () {
			bar();
		})();
	},
};

obj.foo();

// 8

function Test(val) {
	this.val = val;
	setTimeout(function () {
		console.log(this.val);
	}, 0);

	setTimeout(() => {
		console.log(this.val);
	}, 0);
}

new Test(99);

// 9

const obj = {
	name: "Alice",
	getName: function () {
		return (() => this.name)();
	},
};

const nameFn = obj.getName;
console.log(nameFn());

// 10

const obj = {
	a: 1,
	b: {
		a: 2,
		fn: function () {
			return () => console.log(this.a);
		},
	},
};

const fn = obj.b.fn();
fn();

// 11

const x = 10;

const obj = {
	x: 20,
	getX: function () {
		return function () {
			return () => console.log(this.x);
		};
	},
};

const fn = obj.getX()();
fn();

// 12

const obj = {
	n: 5,
	method: function () {
		const fn1 = function () {
			return this.n;
		};
		const fn2 = () => this.n;
		console.log(fn1());
		console.log(fn2());
	},
};

obj.method();
