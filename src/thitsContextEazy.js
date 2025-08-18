// Eazy
function foo() {
	console.log(this);
}

foo();

const obj = {
	value: 42,
	log: function () {
		console.log(this.value);
	},
};

obj.log();

const obj = {
	value: 10,
	log: () => {
		console.log(this.value);
	},
};

obj.log();

function Obj() {
	this.value = 10;
	this.log = () => {
		console.log(this.value);
	};
}
new Obj().log();

const obj = {
	name: "Alice",
	greet: function () {
		console.log("Hi, I'm " + this.name);
	},
};
obj.greet();

function foo() {
	console.log(this);
}
const obj = { foo };
obj.foo();

const obj = {
	name: "Tom",
	greet: function () {
		console.log(this.name);
	},
};
const greet = obj.greet.bind(obj);
greet();

const obj = {
	x: 5,
	y: 10,
	sum: function () {
		return this.x + this.y;
	},
};
console.log(obj.sum());

const obj = {
	a: 1,
	fn: () => console.log(this.a),
};
obj.fn();

const obj = {
	a: 2,
	fn: function () {
		const inner = function () {
			console.log(this.a);
		};
		inner();
	},
};
obj.fn();

const obj = {
	a: 3,
	fn: function () {
		const inner = () => console.log(this.a);
		inner();
	},
};
obj.fn();

const a = 100;
const obj = {
	a: 200,
	getA: function () {
		console.log(a);
	},
};
obj.getA();

const obj1 = { a: 1 };
const obj2 = { a: 2 };
function show() {
	console.log(this.a);
}
show.call(obj1);
show.call(obj2);

const obj = {
	val: 50,
	arrow: () => console.log(this.val),
};
const arrow = obj.arrow;
arrow();

const obj = {
	val: 5,
	method() {
		return () => console.log(this.val);
	},
};
const fn = obj.method();
fn();

// medium
