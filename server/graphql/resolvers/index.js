const thoughtsResolvers = require('./thoughts')
const usersResolvers = require('./users')

module.exports = {
    Query: {
        ...thoughtsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...thoughtsResolvers.Mutation
    }
}