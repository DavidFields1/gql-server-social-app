import { Prisma, PrismaClient, Post, User } from "@prisma/client";

export interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
    token: string
    jwtSecret: string
}

export interface PostArgs {
    post: {
        title: string;
        content: string;
    }
}

export interface SignUpArgs {
    credentials: {
        email: string;
        password: string;
    }
    name: string;
    bio: string;
}

export interface SignInArgs {
    credentials: {
        email: string;
        password: string;
    }
}

export interface PostChangePublishStatusArgs {
    id: string;
    published: boolean;
}

export interface PostPayloadType {
    userErrors: {
        message: string;
    }[];
    post: Post | null;
    ok: boolean;
}

export interface UserPayloadType {
    userErrors: {
        message: string;
    }[];
    ok: boolean;
    token: string | null;
}

export interface UserPostPayloadType {
    userErrors: {
        message: string;
    }[];
    ok: boolean;
    user: User | null;
}

export interface ProfileParentType {
    id: string;
    bio: string;
    userId: string;
}

export interface UserParentType {
    id: string;
}

export interface PostParentType {
    id: string;
    authorId: string;
}