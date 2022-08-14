const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const startServer = async (typeDefs, resolvers) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => ({req})
    })

    mongoose.connect('mongodb+srv://rewidle:rewidle@cluster0.f8jzazt.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true})

    const res = await server.listen({ port: 3001 })

    console.log(`Server ready at ${res.url}`)
}

startServer(typeDefs, resolvers)

