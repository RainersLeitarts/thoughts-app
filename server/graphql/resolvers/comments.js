const { AuthenticationError, UserInputError } = require('apollo-server')

const Thought = require('../../models/Thought')
const checkAuth = require('../../util/checkAuth')

module.exports = {
    Mutation: {
        async createComment(_, { thoughtId, body }, context) {
            const { username } = checkAuth(context)
            if (body.trim() === '') throw new UserInputError('Comment body empty', {
                errors: {
                    body: 'Comment body empty'
                }
            })

            const thought = await Thought.findById(thoughtId)

            if (!thought) throw new UserInputError(`Thought ${thoughtId} not found`)

            thought.comments.unshift({
                body,
                username,
                createdAt: new Date().toISOString()
            })

            await thought.save()
            return thought
        },

        async deleteComment(_, { thoughtId, commentId }, context){
            const { username } = checkAuth(context)

            const thought = await Thought.findById(thoughtId)

            if(!thought) throw new UserInputError('Thought not found')

            const commentIndex = thought.comments.findIndex(comment => commentId === comment.id)

            if(thought.comments[commentIndex].username !== username ) throw new AuthenticationError('This is not your comment')
            thought.comments.splice(commentIndex, 1)
            await thought.save()
            return thought
        }
    }
}