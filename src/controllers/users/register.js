const pool = require("../../config/db")
const { hash_password } = require("../../helpers/bcrypt_password")

const register = async (req,res) => {
    try {
        const { username, password } = req.body

        if (username === '' || password === '') {
            return res.status(400).json({ msg: 'Some fields are missing'})
        }

        const psQuery1 = {
            name: 'checkUsernameQuery',
            text: 'SELECT * FROM users WHERE username = $1 ORDER BY accID ASC',
            values: [username]
        }

        const result1 = await pool.query(psQuery1)

        if (result1.rowCount > 0) {
            return res.status(400).json({ msg: 'username already exists'})
        }

        const passwordCheck = await hash_password(password)

        const psQuery2 = {
            name: 'insertNewUserQuery',
            text: 'INSERT INTO users(username, password) VALUES ($1, $2)',
            values: [username, passwordCheck]
        }

        const result2 = await pool.query(psQuery2)

        return res.status(200).json({ msg : 'registration successful' })
    } catch (error) {
        return res.status(500).json({ error })   
    }
}

module.exports = register
