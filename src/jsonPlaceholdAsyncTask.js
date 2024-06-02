// Посты
[{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}]

// Комменты
[{
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
}]

// Пользователи
[{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "phone": "1-770-736-8031"
}]

// Выходной формат данных (посты):
[{
    "id": 1, // id поста
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", // title поста
    "userName": "Leanne Graham",
    "commentsCount": 10,
}]

(async () => {
    const resultArray = [];
    
    const postsReponse = fetch('https://jsonplaceholder.typicode.com/posts')
    
    const commentsReponse = fetch('https://jsonplaceholder.typicode.com/users')
    
    const usersReponse = fetch('https://jsonplaceholder.typicode.com/comments')

    
    const responseArray = await Promise.all([postsReponse, commentsReponse, usersReponse])
    const [posts, comments, users] = Promise.all(responseArray.map((el) => el.json()))
    
    
    const commentsToPost = comments.reduce((acc, comment) => {
        if (acc[comment.postId]) {
            acc[comment.postId] += 1
        } else {
            acc[comment.postId] = 1
        }
        
        return acc
    }, {})
    
    posts.map((post) => {
        user =  users.find((user) => user.id === post.userId)
        
        return {
            id: post.id,
            title: post.title,
            userName: user.userName,
            commentsCount: commentsToPost[post.id] || 0
        };
    })
    


    
    // https://jsonplaceholder.typicode.com/posts
    // https://jsonplaceholder.typicode.com/users
    // https://jsonplaceholder.typicode.com/comments
    
})();
