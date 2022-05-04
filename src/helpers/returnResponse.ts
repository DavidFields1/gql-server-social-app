import { Post, User } from "@prisma/client"

export const returnResponseAuth = (message: string , ok: boolean, token: string | null) => ({
    userErrors: [{ message }],
    ok,
    token
})

export const returnResponsePost = (message: string , ok: boolean, post: Post | null) => ({
    userErrors: [{ message }],
    ok,
    post
})

export const returnUserPostResponse = (message: string , ok: boolean, user: User | null) => ({
    userErrors: [{ message }],
    ok,
    user
})