import fetch from "node-fetch"

// change this value to test with different userId
// should be a number between 1 and 10
const USER_ID = 1

const validateUserId = (userId) => {
    if (!userId || userId < 1 || userId > 10) {
        throw new Error("userId must be a number between 1 and 10")
    }
}

export const getUsers = async () => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users').then((r) => r.json())
    
    return users
}

export const getUser = async (userId) => {
    validateUserId(userId)

    const users = await getUsers()

    // index of user
    return users[userId - 1]
}

export const getUserEmail = async (userId) => {
    const user = await getUser(userId)

    const userEmail = user.email

    console.log(`User email for userId ${userId}:`, userEmail)

    return userEmail
}

export const getPostsForUser = async (userId) => {
    validateUserId(userId)
    
    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then((r) => r.json())

    console.log(`Posts for userId ${userId}:`, { posts })
    
    return posts
}

export const createPostForUser = async (userId) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: userId,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((r) => r.json())

    console.log("Post Created with response:", response)

    return response
}