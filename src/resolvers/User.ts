import { Post } from "@prisma/client";
import { validateJwt } from "../helpers/validateJwt";
import { Context, UserParentType,  } from "../interfaces";

export const User = {
    posts: async ({ id }: UserParentType, __: any, { prisma, jwtSecret, token }: Context): Promise<Post[]> => {
        try{
            if(token){
                const validToken = validateJwt(token, jwtSecret);
                const isOwner = validToken.userId === id;
            
                return await prisma.post.findMany({
                    where: {
                        authorId: id,
                        ...(isOwner ? {} : { published: true })
                    }
                });
            } else {
                return await prisma.post.findMany({
                    where: {
                        authorId: id,
                        published: true
                    }
                });
            }
        }catch(e: any){
            throw new Error(e)
        }
    }
}