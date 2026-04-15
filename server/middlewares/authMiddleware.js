const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userServices = require('../services/userServices')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1]

            if (!token) throw new Error("Token required")

            // Verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            // Get user from the token
            // req.user = await userServices.getUserById(decoded.id)
            req.user = decoded;

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not authorized")
    }
})

module.exports = {
    protect
}