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
