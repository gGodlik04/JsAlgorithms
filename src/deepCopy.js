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
