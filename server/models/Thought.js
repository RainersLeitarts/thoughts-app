const {model, schema, Schema} = require('mongoose')

const thoughtSchema = new Schema({
    username: String,
    body: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Thought', thoughtSchema)