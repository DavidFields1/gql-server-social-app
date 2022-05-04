import { Context, PostArgs, PostChangePublishStatusArgs, PostPayloadType, UserPayloadType, UserPostPayloadType } from "../../interfaces";
import { returnResponsePost, returnUserPostResponse } from "../../helpers/returnResponse";
import { validateJwt } from '../../helpers/validateJwt';
import jwt from 'jsonwebtoken';

export const postResolvers = {
    postCreate: async (_: any, { post } : PostArgs, { prisma, token, jwtSecret }: Context): Promise<PostPayloadType> => {
        try{
            const { content, title } = post;
            if (!content || !title) return returnResponsePost('Please provide content and title', false, null);

            const validToken = jwt.verify(token, jwtSecret) as {
                userId: string;
            };

            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: validToken.userId
                }
            })

            return returnResponsePost('', true, newPost);

        }catch(e: any){
            return returnResponsePost(e.message, false, null);
        }
    },
    postUpdate: async (_: any, { post, id } : { id: string, post: PostArgs['post']}, { prisma, token, jwtSecret }: Context): Promise<PostPayloadType> => {
        try {
            const { content, title } = post;
            if ((!content && !title) || !id) return returnResponsePost('Please provide content and title', false, null);

            const existingPost = await prisma.post.findUnique({
                where: {
                    id
                }
            })
            if (!existingPost) return returnResponsePost('Post not found', false, null);

            const validToken = validateJwt(token, jwtSecret);
            if (!validToken) return returnResponsePost('Invalid token', false, null);
        
            if (existingPost.authorId !== validToken.userId) return returnResponsePost('You are not the author of this post', false, null);

            const updatedPost = await prisma.post.update({
                where: {
                    id
                },
                data: {
                    title,
                    content,
                }
            })

            return returnResponsePost('', true, updatedPost);

        } catch (e: any) {
            return returnResponsePost(e.message, false, null);
        }
    },
    postDelete: async (_: any, { id } : { id: string }, { prisma, token, jwtSecret }: Context): Promise<PostPayloadType> => {
        try{
            if (!id) return returnResponsePost('Please provide an id', false, null);

            const existingPost = await prisma.post.findUnique({
                where: {
                    id
                }
            })

            if (!existingPost) return returnResponsePost('Post not found', false, null);

            const validToken = validateJwt(token, jwtSecret);
            if (!validToken) return returnResponsePost('Invalid token', false, null);

            if (existingPost.authorId !== validToken.userId) return returnResponsePost('You are not the author of this post', false, null);

            const deletedPost = await prisma.post.delete({
                where: {
                    id: existingPost.id
                }
            })

            return returnResponsePost('', true, deletedPost);

        }catch(e: any){
            return returnResponsePost(e.message, false, null);
        }
    },
    postChangePublishStatus: async (_: any, { id, published } : PostChangePublishStatusArgs, { prisma, token, jwtSecret }: Context): Promise<PostPayloadType> => {
        try{
            if (!id) return returnResponsePost('Please provide an id', false, null);

            const existingPost = await prisma.post.findUnique({
                where: {
                    id
                }
            })

            if (!existingPost) return returnResponsePost('Post not found', false, null);

            const validToken = validateJwt(token, jwtSecret);
            if (!validToken) return returnResponsePost('Invalid token', false, null);

            if (existingPost.authorId !== validToken.userId) return returnResponsePost('You are not the author of this post', false, null);

            const updatedPost = await prisma.post.update({
                where: {
                    id
                },
                data: {
                    published
                }
            })

            return returnResponsePost('', true, updatedPost);

        }catch(e: any){
            return returnResponsePost(e.message, false, null);
        }
    },
    // User: async (_: any, { id } : { id: string }, { prisma }: Context): Promise<UserPostPayloadType> => {
    //     try{
    //         if (!id) return returnUserPostResponse('Please provide an id', false, null);

    //         const existingUser = await prisma.user.findUnique({
    //             where: {
    //                 id
    //             }
    //         })

    //         if (!existingUser) return returnUserPostResponse('User not found', false, null);

    //         return returnUserPostResponse('', true, existingUser);

    //     }catch(e: any){
    //         return returnUserPostResponse(e.message, false, null);
    //     }
    // }
}