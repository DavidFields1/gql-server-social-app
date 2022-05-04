import { User } from "@prisma/client";
import { Context, ProfileParentType } from "../interfaces";

export const Profile = {
    user: async ({ userId }: ProfileParentType, __: any, { prisma }: Context): Promise<User | null> => {
        try{
            return await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
        }catch(e: any){
            throw new Error(e)
        }
    }
}