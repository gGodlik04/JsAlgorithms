interface User {
	name: string;
	age: number;
	occupation: string;
}

interface Admin extends Omit<User, "occupation"> {
	role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
	{
		name: "Max Mustermann",
		age: 25,
		occupation: "Chimney sweep",
	},
	{
		name: "Jane Doe",
		age: 32,
		role: "Administrator",
	},
	{
		name: "Kate Müller",
		age: 23,
		occupation: "Astronaut",
	},
	{
		name: "Bruce Willis",
		age: 64,
		role: "World saver",
	},
];

type ReadOnlyUtility<T extends object> = {
	readonly [K in keyof T]: T[K];
};

type PromiseReturnTypeOwn<T extends Promise<unknown>> = T extends Promise<
	infer K
>
	? K
	: never;

// predicate Tyep Guard

export const isAdmin = (person: Person): person is Admin => {
	return "role" in person;
};

export function logPerson(person: Person) {
	let additionalInformation: string = "";
	if (isAdmin(person)) {
		additionalInformation = person.role;
	} else {
		additionalInformation = person.occupation;
	}
	console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

//////////////////////////////
// 1. Advanced Types

// Задача: Напиши утилиту DeepReadonly<T>, которая делает все свойства объекта и вложенные объекты полностью readonly.

type X = {
	a: number;
	b: { c: string; d: { e: boolean } };
};

type Y = DeepReadonly<X>;

type DeepReadonly<T> = {
	[K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

//////////////////////////////
// 2. Conditional Types & Inference

// Задача: Напиши тип Flatten<T> который “выравнивает” вложенные массивы в один уровень.
type Z = Flatten<[1, [2, 3], [[4]]]>; // => [1, 2, 3, 4]

type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
	? First extends any[]
		? [...Flatten<First>, ...Flatten<Rest>]
		: [First, ...Flatten<Rest>]
	: [];

//////////////////////////////
// 3. Mapped Types

// Задача: Создай тип OptionalByKeys<T, K> который делает указанные ключи K объекта T опциональными.

type User2 = {
	name: string;
	age: number;
	location: string;
};

type PartialUser = OptionalByKeys1<User2, "age" | "location">;

type isEqual1<T, U> = T extends U ? (U extends T ? true : false) : false;
type isEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <
	T
>() => T extends B ? 1 : 2
	? true
	: false;

type OptionalByKeys1<T, K extends keyof T> = {
	[P in keyof T as P extends K ? P : never]?: T[P];
} & {
	[P in keyof T as P extends K ? never : P]: T[P];
} extends infer O
	? { [P in keyof O]: O[P] }
	: never;

type OptionalByKeys2<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
/*
PartialUser = {
  name: string;
  age?: number;
  location?: string;
}
*/

//////////////////////////////
// 4. Type-safe Event Emitter

// Задача: Напиши типизированный EventEmitter, который гарантирует, что подписка и эмиттинг строго типизированы:

type Events = {
	login: { user: string };
	logout: void;
};

declare const emitter: EventEmitter<Events>;

emitter.on("login", (payload) => {
	console.log(payload.user);
});

emitter.emit("logout"); // ok
emitter.emit("login", { user: "Alice" }); // ok
emitter.emit("login", {}); // ❌ ошибка компиляции

//////////////////////////////
// 5. Template Literal Types

// Задача: Напиши тип SnakeToCamel<S> который конвертирует строку из snake_case в camelCase.

type T1 = SnakeToCamel<"hello_world_test">; // "helloWorldTest"
type T2 = SnakeToCamel<"foo_bar">; // "fooBar"

//////////////////////////////
// 6. Recursive Type Challenges

// Задача: Напиши тип Paths<T> который возвращает все возможные пути до свойств объекта в виде строк через ..

type Obj = { a: { b: { c: number } }; d: string };
type P = Paths<Obj>;
// "a" | "a.b" | "a.b.c" | "d"

//////////////////////////////
// 7. Utility & Overloads

// Задача: Напиши перегрузку функции get для безопасного доступа к объекту по пути:

declare function get<T, K extends string>(obj: T, path: K): unknown;

const obj = { a: { b: 1 } };

const v = get(obj, "a.b"); // тип должен быть number

//////////////////////////////
// Реализуй утилиту PickByType<T, U>

// Выбирает поля объекта, тип которых совпадает с U.

type PickByType<T, U> = {
	[K in keyof T]: T[K] extends U ? (U extends T[K] ? T[K] : never) : never;
};

//////////////////////////////
// Реализуй тип, который делает все поля необязательными, кроме id

interface objWithId {
	id: string;
}

type DeleteId1<T extends objWithId> = Partial<Omit<T, "id">> &
	Pick<T, "id"> extends infer G
	? { [K in keyof T]: T[K] }
	: never;

type DeleteId2<T> = {
	[K in keyof T]?: T[K] extends "id"
		? never
		: T[K] & { [P in keyof T]?: T[P] extends "id" ? T[P] : never };
};

//////////////////////////////
// Реализуй “рекурсивный readonly”

type recursiveReadOnly<T extends object> = {
	readonly [K in keyof T]: T[K] extends object ? recursiveReadOnly<T[K]> : T[K];
};
