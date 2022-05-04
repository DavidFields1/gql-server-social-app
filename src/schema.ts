import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        self: User
        posts: [Post!]!
        profile(userId: ID!): Profile
    }

    type Mutation {
        postCreate(post: PostInput!): PostPayload!
        postUpdate(id: ID!, post: PostInput!): PostPayload!
        postDelete(id: ID!): PostPayload!
        postChangePublishStatus(id: ID!, published: Boolean!): PostPayload!

        signUp(credentials: CredentialsInput!, name: String!, bio: String!): AuthPayload!
        signIn(credentials: CredentialsInput!): AuthPayload!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        createdAt: String!
        published: Boolean!
        user: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
    }

    type Profile {
        id: ID!
        bio: String!
        user: User!
    }

    type UserError {
        message: String!
    }

    type PostPayload {
        userErrors: [UserError!]!
        post: Post
        ok: Boolean!
    }

    type AuthPayload { 
        userErrors: [UserError!]!
        token: String!
        ok: Boolean!        
    }

    input PostInput {
        title: String
        content: String
    }

    input SignUpArgs {
        email: String!
        name: String!
        password: String!
        bio: String!
    }

    input CredentialsInput {
        email: String!
        password: String!
    }
`;