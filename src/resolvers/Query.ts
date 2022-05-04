import { Post, Profile, User } from "@prisma/client";
import { validateJwt } from "../helpers/validateJwt";
import { Context } from "../interfaces";

export const Query = { 
    posts: async (_: any, __: any, { prisma }: Context): Promise<Post[]> => {
        try{
            return await prisma.post.findMany({
                where: {
                    published: true
                },
                orderBy: [{
                    createdAt: "desc"
                }]
            });
        }catch(e: any){
            throw new Error(e)
        }
    },
    self: async (_: any, __: any, { prisma, token, jwtSecret }: Context): Promise<User | null> => {
        try{
            const validToken = validateJwt(token, jwtSecret);
            if (!validToken) throw new Error('Invalid token');

            return await prisma.user.findUnique({
                where: {
                    id: validToken.userId 
                }
            });
        }catch(e: any){
            throw new Error(e)
        }
    },
    profile: async (_: any, { userId }: { userId: string }, { prisma }: Context): Promise<Profile | null> => {
        try{
            return await prisma.profile.findUnique({
                where: {
                    userId
                }
            });
        }catch(e: any){
            throw new Error(e)
        }
    }
};