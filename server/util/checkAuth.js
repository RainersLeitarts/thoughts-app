const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server')

const { JWT_SECRET } = require('../config')

module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if(!authHeader) throw new Error('No authorization header')
    const token = authHeader.split('Bearer ')[1]
    if(!token) throw new Error('Provide authentication token: \'Bearer [token]\'')

    try {
        const user = jwt.verify(token, JWT_SECRET)
        return user
    } catch (error) {
        throw new AuthenticationError('Token is either expired or invalid')
    }

}