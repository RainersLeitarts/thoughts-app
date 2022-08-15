const thoughtsResolvers = require('./thoughts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports = {
    Thought: {
        likeCount(parent){
            return parent.likes.length
        },
        commentCount(parent){
            return parent.comments.length
        }
    },
    Query: {
        ...thoughtsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...thoughtsResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
}