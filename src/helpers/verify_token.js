const {verify} = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// middleware for protected routes
const verify_token = (req, res, next) => {
    try {
        if(req.headers.authorization === '' || req.headers.authorization == null)
            return res.status(400).json({ msg : 'Unauthorized'})

        const token = req.headers.authorization.split(' ')[1]
        const valid_token = verify(token, process.env.JWT_SECRET)

	    if(!valid_token) {
            return res.status(400).json({ msg : 'Unauthorized'})
        }

        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error })
    }
}

module.exports = verify_token