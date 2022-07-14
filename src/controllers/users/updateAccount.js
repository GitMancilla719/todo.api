const pool = require("../../config/db")
const {verify} = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const { compare_password, hash_password } = require("../../helpers/bcrypt_password")

const updateAcc = async (req,res) => {
    try {
        const { username, oldPassword, password, confirmPassword } = req.body

        const token = req.headers.authorization.split(' ')[1]
        const decoded = verify(token, process.env.JWT_SECRET)

        const psQuery = {
            name: 'CheckIfAccExistsQuery',
            text: 'SELECT * FROM users WHERE accid = $1',
            values: [decoded.accID]
        }
        const resultCheck = await pool.query(psQuery)

        if (resultCheck.rowCount === 0 )
            return res.status(400).json({ msg : 'no account with this token exists'})

        if (password === '' || confirmPassword === '') 
            return res.status(400).json({ msg: 'Some fields are missing'})
        
        if (password !== confirmPassword) 
            return res.status(400).json({ msg: 'password does not match'})

        const psQuery1 = {
            name: 'CheckOldPasswordQuery',
            text: 'SELECT password FROM users WHERE accid = $1',
            values: [decoded.accID]
        }
        const result = await pool.query(psQuery1)

        const oldPasswordCheck = await compare_password(oldPassword, result.rows[0].password)

        if (!oldPasswordCheck) 
            return res.status(400).json({ msg: 'old password is incorrect'})

        const changeUsername = username !== '' || username != null ? username : decoded.username
        const newHashedPassword = await hash_password(password)

        const psQuery2 = {
            name: 'UpdateAccountQuery',
            text: 'UPDATE users SET username = $1, password = $2 WHERE accid = $3',
            values: [changeUsername, newHashedPassword, decoded.accID]
        }
        await pool.query(psQuery2)
      
        return res.status(200).json({ msg : 'update successful'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })   
    }
}

module.exports = updateAcc
