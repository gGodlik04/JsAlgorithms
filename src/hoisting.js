// 1.
function test() {
	console.log(a);
	console.log(foo());

	var a = 1;
	function foo() {
		return 2;
	}
}

// undefined 2

test();

// 2.
function bar() {
	console.log(b);
	let b = 3;
}

// error
bar();

// 3.
var x = 1;
function outer() {
	var x = 2;
	function inner() {
		console.log(x);
		var x = 3;
	}
	inner();
}

//undefined
// 2

outer();
