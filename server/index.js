const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

require('dotenv').config()

const PORT = process.env.PORT || 3001

const startServer = async (typeDefs, resolvers) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => ({req})
    })

    mongoose.connect(`mongodb+srv://rewidle:${process.env.MONGODB_PASSWORD}@cluster0.f8jzazt.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser: true})
    .catch(err => {
        console.log(err)
    })

    const res = await server.listen({ port: PORT })

    console.log(`Server ready at ${res.url}`)
}

startServer(typeDefs, resolvers)

