function calculator(a, b, operation) {
	let result;
	switch (operation) {
		case "+":
			if (isNaN(a) && isNaN(b)) return "Неверная операция";
			result = a + b;
			return typeof result === "string" ? NaN : result;
			break;
		case "*":
			result = a * b;
			return typeof result !== "number" ? NaN : result;
			break;
		case "/":
			result = a / b;
			return isFinite(result) ? result : 0;
			break;
		default:
			return "Неверная операция";
	}
}

// Примеры использования
console.log(calculator(10, 5, "+")); // 15
console.log(calculator(10, "5", "*")); // 50
console.log(calculator("Hello", "World", "+")); // Неверная операция
console.log(calculator(10, 0, "/")); // 0
console.log(calculator(-10, 0, "/")); // 0
console.log(calculator("abc", 5, "+")); // NaN
console.log(calculator(10, 5, "%")); // Неверная операция
