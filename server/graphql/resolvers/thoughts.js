const {AuthenticationError} = require('apollo-server')

const Thought = require('../../models/Thought')
const checkAuth = require('../../util/checkAuth')


module.exports = {
    Query: {
        async getThoughts() {
            try {
                const thoughts = await Thought.find().sort({ createdAt: -1 })
                return thoughts
            } catch (error) {
                throw new Error(error)
            }
        },

        async getThought(_, { thoughtId }) {
            try {
                const thought = await Thought.findById(thoughtId)
                if (!thought) {
                    throw new Error('Thought not found')
                }

                return thought

            } catch (error) {
                throw new Error(error)
            }
        }
    },

    Mutation: {
        async createThought(_, { body }, context) {
            const user = checkAuth(context)
            
            const newThought = new Thought({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const thought = await newThought.save()

            return thought
        },

        async deleteThought(_, { thoughtId }, context) {
            const user = checkAuth(context)

            try {
                const thought = await Thought.findById(thoughtId)

                if (!thought) throw new Error('Thought not found')

                if(user.username !== thought.username) throw new AuthenticationError('You can\'t do that')

                await thought.delete()
                return `Thought ${thoughtId} deleted`
            } catch (error) {
                throw new Error(error)
            }

            
        }
    }
}