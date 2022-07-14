const pool = require("../../config/db")
const { compare_password } = require("../../helpers/bcrypt_password")
const create_token = require("../../helpers/create_token")

const login = async (req,res) => {
    try {
        const { username, password } = req.body

        if (username === '' || password === '') {
            return res.status(400).json({ msg: 'Some fields are missing'})
        }

        const psQuery = {
            name: 'loginQuery',
            text: 'SELECT * FROM users WHERE username = $1 ORDER BY accID ASC',
            values: [username]
        }

        const result = await pool.query(psQuery)

        if (result.rowCount === 0) {
            return res.status(400).json({ msg: 'username or password is incorrect'})
        }

        const passwordCheck = await compare_password(password, result.rows[0].password)

        if (!passwordCheck) {
            return res.status(400).json({ msg: 'username or password is incorrect'})
        }

        const access_token = create_token({ accID: result.rows[0].accid, username: result.rows[0].username })

        return res.status(200).json({ 
            msg : 'login successful',
            token: access_token
        })
    } catch (error) {
        return res.status(500).json({ error })   
    }
}

module.exports = login
