import { UserPayloadType, Context, SignUpArgs } from "../../interfaces"
import { validateSignupData } from "../../helpers/validateSignupData";
import { SignInArgs } from '../../interfaces/index';
import { returnResponseAuth } from "../../helpers/returnResponse";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const authResolvers = {
    signUp: async (_: any, { credentials: { email, password }, name, bio }: SignUpArgs, { prisma, jwtSecret }: Context): Promise<UserPayloadType> => {
        try{
            const { isValid, error } = validateSignupData({ name, credentials: { email, password }, bio });
            if (!isValid || error)  return returnResponseAuth(error || "Invalid data", false, '');

            const emailTaken = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (emailTaken) return returnResponseAuth("Email already taker", false, '');
    
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,   
                    profile: {
                        create: {
                            bio
                        }
                    }
                }
            })
    
            const token = jwt.sign({ 
                userId: user.id,
            }, jwtSecret, { expiresIn: '6h' });
    
            return returnResponseAuth("", true, token);

        } catch (e: any) {
            return returnResponseAuth(e.message, false, '');
        }
    },

    signIn: async (_: any, { credentials: { email, password } }: SignInArgs, { prisma, jwtSecret }: Context): Promise<UserPayloadType> => {
        try{
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })
    
            const isMatch = user ? await bcrypt.compare(password, user.password) : false;
            if (!isMatch || !user) return returnResponseAuth("Invalid credentials", false, '');
    
            const token = jwt.sign({ 
                userId: user.id,
            }, jwtSecret, { expiresIn: '6h' });
    
            return returnResponseAuth("", true, token);

        } catch(e: any){
            return returnResponseAuth(e.message, false, '');
        }
    }
}