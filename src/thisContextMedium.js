const obj = {
	val: 10,
	increment: function () {
		const add = () => this.val++;
		add();
	},
};
obj.increment();
console.log(obj.val);

// 2

const obj = {
	val: 20,
	increment: function () {
		function add() {
			this.val++;
		}
		add();
	},
};
obj.increment();
console.log(obj.val);

// 3

const obj = {
	num: 5,
	multiply: function (n) {
		return this.num * n;
	},
};
const multiply = obj.multiply;
console.log(multiply(2));
console.log(multiply.call(obj, 2));

// 4

const obj = {
	x: 1,
	f1: function () {
		console.log(this.x);
	},
	f2: () => {
		console.log(this.x);
	},
};
obj.f1();
obj.f2();

// 5

const obj = {
	a: 1,
	fn: function () {
		setTimeout(function () {
			console.log(this.a);
		}, 0);
	},
};
obj.fn();

// 6

const obj = {
	a: 2,
	fn: function () {
		setTimeout(() => {
			console.log(this.a);
		}, 0);
	},
};
obj.fn();

// 7

const person = {
	age: 25,
	grow: function () {
		return function () {
			console.log(this.age + 1);
		};
	},
};
const growFunc = person.grow();
growFunc();

// 8

const person = {
	age: 30,
	grow: function () {
		return () => console.log(this.age + 1);
	},
};
const growFunc = person.grow();
growFunc();

// 9

function Foo() {
	this.bar = 42;
	setTimeout(() => console.log(this.bar), 0);
}
new Foo();

// 10

function Foo() {
	this.bar = 42;
	setTimeout(function () {
		console.log(this.bar);
	}, 0);
}
new Foo();

// 11

const obj = {
	x: 10,
	getX: function () {
		return () => console.log(this.x);
	},
};
const fn = obj.getX();
fn();

// 12

const obj = {
	x: 20,
	getX: function () {
		function inner() {
			console.log(this.x);
		}
		return inner;
	},
};
const fn = obj.getX();
fn();

//13

const obj = {
	val: 5,
	increment: function () {
		return function () {
			this.val++;
		};
	},
};
const fn = obj.increment();
fn();
console.log(obj.val);

// 14

const obj = {
	val: 5,
	increment: function () {
		return () => {
			this.val++;
		};
	},
};
const fn = obj.increment();
fn();
console.log(obj.val);

//15

const obj = {
	a: 1,
	fn: function () {
		setTimeout(function () {
			console.log(this.a);
		}, 0);
	},
};
obj.fn();

//16

const obj = {
	a: 2,
	fn: function () {
		setTimeout(() => {
			console.log(this.a);
		}, 0);
	},
};
obj.fn();

//17

const obj = {
	num: 10,
	multiply: function (n) {
		return this.num * n;
	},
};
const multiply = obj.multiply.bind({ num: 5 });
console.log(multiply(2));

//18

const obj = {
	name: "Alice",
	greet: function () {
		console.log(this.name);
	},
};
const greet = obj.greet;
greet.call({ name: "Bob" });

//19

function Foo(val) {
	this.val = val;
	setTimeout(() => console.log(this.val), 0);
}
new Foo(99);

//20

function Foo(val) {
	this.val = val;
	setTimeout(function () {
		console.log(this.val);
	}, 0);
}
new Foo(100);

// 21

const obj = {
	count: 0,
	increment: function () {
		this.count++;
		(() => console.log(this.count))();
	},
};
obj.increment();

// 22

const obj = {
	x: 1,
	y: 2,
	sum: function () {
		return function () {
			console.log(this.x + this.y);
		};
	},
};
const fn = obj.sum();
fn();
