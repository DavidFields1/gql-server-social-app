import { User } from "@prisma/client";
import { Context } from "../interfaces";
import { PostParentType } from '../interfaces/index';

export const Post = {
    user: async ({ authorId }: PostParentType, __: any, { prisma }: Context): Promise<User | null> => {
        try{
            return await prisma.user.findUnique({
                where: {
                    id: authorId
                }
            });
        }catch(e: any){
            throw new Error(e)
        }
    }
}