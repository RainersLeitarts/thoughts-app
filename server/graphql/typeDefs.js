const gql = require('graphql-tag')

const typeDefs = gql`
    type Thought{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
    }

    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }

    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query{
        getThoughts: [Thought]
        getThought(thoughtId: ID!): Thought
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createThought(body: String!) : Thought!
        deleteThought(thoughtId: ID!): String
    }
    `
module.exports = typeDefs