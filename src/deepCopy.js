// Рабочий черновой вариант
const deepCopy = (obj) => {
	const isArray = Array.isArray(obj);
	const copy = isArray ? [] : {};

	const isObjectOrArray = (entity) => {
		return typeof entity === "object" && entity !== null ? true : false;
	};

	if (isArray) {
		for (const el of obj) {
			if (isObjectOrArray(el)) {
				copy.push(deepCopy(el));
			} else {
				copy.push(el);
			}
		}
	} else {
		for (const [key, value] of Object.entries(obj)) {
			if (isObjectOrArray(value)) {
				copy[key] = deepCopy(value);
			} else {
				copy[key] = value;
			}
		}
	}

	return copy;
};

// Отрефакторенный вариант

const deepCopy = (input) => {
	const isArray = Array.isArray(input);
	const copyObject = isArray ? [] : {};

	if (typeof input !== "object" || input === null) return input;

	for (const [key, value] of Object.entries(input)) {
		copyObject[key] = deepCopy(value);
	}

	return copyObject;
};

const testObject = {
	a: [{}],
	b: {
		d: 9,
		g: {
			f: 2,
		},
	},
	d: {
		n: [2, 4],
	},
};

console.log(deepCopy(testObject));

//Канон ~lodash

const deepClone = (input, hash = new WeakMap()) => {
	if (input === null || typeof input !== "object") {
		return input; // примитивы возвращаем как есть
	}

	if (hash.has(input)) {
		return hash.get(input); // обработка циклических ссылок
	}

	if (input instanceof Date) {
		return new Date(input);
	}

	if (input instanceof RegExp) {
		return new RegExp(input);
	}

	const result = Array.isArray(input) ? [] : {};
	hash.set(input, result);

	for (const key in input) {
		if (input.hasOwnProperty(key)) {
			result[key] = deepClone(input[key], hash);
		}
	}

	return result;
};
