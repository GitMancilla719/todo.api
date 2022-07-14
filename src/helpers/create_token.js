const {sign} = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// use in login logic
const create_token = (info) => {
    const access_token = sign({ accID: info.accID, username: info.username }, process.env.JWT_SECRET, { expiresIn: '30d'})
    return access_token
}

module.exports = create_token