//Пользователи – https://jsonplaceholder.typicode.com/users

//Посты пользователей – https://jsonplaceholder.typicode.com/posts

//Задачи пользователей (todos) – https://jsonplaceholder.typicode.com/todos

//Твоя задача:
//✅ Запросить все данные (пользователей, их посты и задачи)
//✅ Связать данные по userId (у постов и задач есть userId, который соответствует id пользователя).
//✅ Создать массив пользователей, где у каждого будет:

//id, name, email (из /users)

//postsCount – количество постов пользователя

//completedTasks – количество выполненных задач (completed: true)

//incompleteTasks – количество невыполненных задач (completed: false)
//✅ Отсортировать массив по убыванию количества постов (postsCount).
//✅ Вывести результат в консоль в виде:

//const test = [
// {
//   id: 1,
//   name: "Leanne Graham",
//   email: "Sincere@april.biz",
//   postsCount: 10,
//   completedTasks: 5,
//   incompleteTasks: 5
// },
// {
//   id: 2,
//   name: "Ervin Howell",
//   email: "Shanna@melissa.tv",
//   postsCount: 8,
//   completedTasks: 3,
//   incompleteTasks: 7
//},
//]

// posts
//{
//  "userId": 1,
//"id": 1,
//"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//},

//users

//{
//   "id": 1,
//   "name": "Leanne Graham",
//   "username": "Bret",
//   "email": "Sincere@april.biz",
//   "address": {
//     "street": "Kulas Light",
//     "suite": "Apt. 556",
//     "city": "Gwenborough",
//     "zipcode": "92998-3874",
//     "geo": {
//       "lat": "-37.3159",
//       "lng": "81.1496"
//     }
//   },
//   "phone": "1-770-736-8031 x56442",
//   "website": "hildegard.org",
//   "company": {
//     "name": "Romaguera-Crona",
//     "catchPhrase": "Multi-layered client-server neural-net",
//     "bs": "harness real-time e-markets"
//   }
// },

// todos
//{
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// },

(async function () {
	const urls = [
		"https://jsonplaceholder.typicode.com/users",
		"https://jsonplaceholder.typicode.com/posts",
		"https://jsonplaceholder.typicode.com/todos",
	];

	const responses = await Promise.all(urls.map((url) => fetch(url)));
	const data = await Promise.all(responses.map((response) => response.json()));

	const [users, posts, todos] = data;

	users.forEach((user) => {
		posts.forEach((post) => {
			if (+post.userId === +user.id) {
				user.postsCount ? user.postsCount++ : (user.postsCount = 1);
			}
		});

		todos.forEach((todo) => {
			if (+todo.userId === +user.id) {
				if (todo.completed) {
					user.completedTasks
						? user.completedTasks++
						: (user.completedTasks = 1);
				} else {
					user.incompleteTasks
						? user.incompleteTasks++
						: (user.incompleteTasks = 1);
				}
			}
		});
	});

	const result = users.sort((a, b) => a.postsCount < b.postsCount);

	console.log(result, "resutl");

	//const usersMap = new Map(users.map(user => {return [+user.id, user]}))

	//const isPostsMore = posts.length > todos.length

	// const result = (isPostsMore ? posts : todos).map((data) => {
	//	if (isPostsMore) {
	//       usersMap.set(+data.userId, {})
	//    } else {

	//     }
	// })

	console.log(result, "result");
})()(
	//канон решение

	async function () {
		const urls = [
			"https://jsonplaceholder.typicode.com/users",
			"https://jsonplaceholder.typicode.com/posts",
			"https://jsonplaceholder.typicode.com/todos",
		];

		const [users, posts, todos] = await Promise.all(
			urls.map((url) => fetch(url).then((r) => r.json()))
		);

		// Создаем быстрые lookup-таблицы
		const postsByUserId = posts.reduce((acc, post) => {
			acc[post.userId] = (acc[post.userId] || 0) + 1;
			return acc;
		}, {});

		const todosByUserId = todos.reduce((acc, todo) => {
			if (!acc[todo.userId]) {
				acc[todo.userId] = { completed: 0, incomplete: 0 };
			}
			if (todo.completed) {
				acc[todo.userId].completed++;
			} else {
				acc[todo.userId].incomplete++;
			}
			return acc;
		}, {});

		// Формируем результат за O(n)
		const result = users
			.map((user) => ({
				id: user.id,
				name: user.name,
				email: user.email,
				postsCount: postsByUserId[user.id] || 0,
				completedTasks: todosByUserId[user.id]?.completed || 0,
				incompleteTasks: todosByUserId[user.id]?.incomplete || 0,
			}))
			.sort((a, b) => b.postsCount - a.postsCount); // O(n log n)

		console.log(result);
	}
)();
