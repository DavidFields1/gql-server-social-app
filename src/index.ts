import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Query, Mutation, Profile, User, Post } from './resolvers';
import { PrismaClient } from '@prisma/client';
require("dotenv").config();

const prisma = new PrismaClient();

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Profile,
        User,
        Post
    },
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        
        return {
            prisma,
            jwtSecret: process.env.JWT_SECRET,
            token
        }
    }
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});