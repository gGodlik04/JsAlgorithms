// == если разные типы → JS применяет правила ToPrimitive → ToNumber.

// [] → '', [x] → String(x).

// Number('') → 0, Number(null) → 0, Number(undefined) → NaN.

// false → 0, true → 1.

// {} → '[object Object]'.

// 1

console.log([1] + [2]); // ?
console.log([1] - [2]); // ?
console.log([1, 2] == "1,2"); // ?
console.log([1, 2] === "1,2"); // ?

// 2

console.log([] == ![]); // ?
console.log([] == !![]); // ?
console.log(![] == false); // ?
console.log(!![] == true); // ?

// 3

console.log(null + 1); // ?
console.log(undefined + 1); // ?
console.log(null == 0); // ?
console.log(undefined == 0); // ?

// 4

console.log("" == 0); // ?
console.log("" === 0); // ?
console.log(" " == 0); // ?
console.log("\t\n" == 0); // ?

// 5

console.log({} + []); // ?
console.log([] + {}); // ?
console.log({} + {}); // ?
console.log([] - {}); // ?

// 6

console.log([] + []); // ''   ✅
console.log([] - []); // 0   ✅
console.log([[]] == 0); // true ❌ (у тебя false)
console.log([null] == 0); // true ✅
console.log([undefined] == 0); // false ✅

// 7

console.log(+[]); // 0 ✅
console.log(+{}); // NaN ✅
console.log(+[1, 2, 3]); // NaN ✅
console.log(+[[]]); // 0 ❌ (у тебя NaN)
console.log(+[, ,]); // 0 ❌ (у тебя NaN)

// 8

console.log([] + []); // ''   ✅
console.log([] - []); // 0   ✅
console.log([[]] == 0); // true ❌ (у тебя false)
console.log([null] == 0); // true ✅
console.log([undefined] == 0); // false ✅

// 9

console.log(+[]); // 0 ✅
console.log(+{}); // NaN ✅
console.log(+[1, 2, 3]); // NaN ✅
console.log(+[[]]); // 0 ❌ (у тебя NaN)
console.log(+[, ,]); // 0 ❌ (у тебя NaN)

// 10

console.log([] == ""); // true ✅
console.log([0] == 0); // true ✅
console.log([0] == "0"); // true ✅
console.log([1, 2] == "1"); // false ✅
console.log([1, 2] == "1,2"); // true ✅

// 11

console.log("" + {}); // '[object Object]' ✅
console.log({} + ""); // '[object Object]' ✅
console.log({} + [] + {}); // '[object Object][object Object]' ❌ (у тебя '0object Object')
console.log([] + {} + []); // '[object Object]' ✅
console.log({} + []); // '[object Object]' ✅

// 12

console.log(false == "0"); // true ❌ (у тебя false)
console.log(false == []); // true ❌ (у тебя false)
console.log(false == {}); // false ✅
console.log(null == []); // false ✅
console.log(undefined == []); // false ✅

// 13
