// Реализуй функцию-обёртку, которая принимает асинхронную функцию и количество попыток.
// Если функция падает с ошибкой — она должна повторяться указанное количество раз с паузой между попытками.

// Задача: retry — повтор асинхронной функции

// Описание:
// Реализуй функцию retry, которая принимает два аргумента:

// Асинхронную функцию asyncFunc (возвращает Promise).

// Количество попыток times (integer).

// Функция retry возвращает новую функцию, которая при вызове:

// Вызывает asyncFunc.

// Если asyncFunc успешно завершилась, возвращает её результат.

// Если asyncFunc выбрасывает ошибку или возвращает отклонённый Promise, функция пытается вызвать её заново, пока не исчерпаются все попытки.

// Между попытками можно сделать небольшую паузу (например, через setTimeout или await sleep(ms)).

// Требования к реализации:

// Функция должна быть асинхронной (возвращать Promise).

// Количество попыток должно включать первый вызов. Например: если times = 3, функция вызовется максимум 3 раза.

// Если все попытки завершились ошибкой, вернуть последнюю ошибку.

// Поддерживать передачу аргументов в исходную функцию и сохранение контекста this, если нужно

const retry = function (asyncFunc, times) {
	return function (...args) {
		const recursiveFuncCall = (n) => {
			return asyncFunc.apply(this, args).catch((e) => {
				if (n <= 1) {
					return Promise.reject(e);
				}

				return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
					recursiveFuncCall(n - 1)
				);
			});
		};

		return recursiveFuncCall(times);
	};
};

const fetchData = async (url) => {
	if (Math.random() < 0.7) throw new Error("Failed to fetch");
	return "Data from " + url;
};

const fetchData = async (url) => {
	console.log("da");
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() < 0.7) {
				console.log("true");
				reject("Failed to fetch");
			} else {
				console.log("false");
				resolve("Data from " + url);
			}
		}, 2000);
	});
};

const fetchWithRetry = retry(fetchData, 3);

fetchWithRetry("https://api.example.com")
	.then(console.log)
	.catch(console.error);
