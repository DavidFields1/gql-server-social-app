import jwt, { JwtPayload } from 'jsonwebtoken';

export const validateJwt = (token: string, jwtSecret: string): { userId: string } => {
    const validToken = jwt.verify(token, jwtSecret) as {
        userId: string;
    };
    return validToken;
}