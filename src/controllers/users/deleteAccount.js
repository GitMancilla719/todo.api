const pool = require("../../config/db")
const {verify} = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const deleteAcc = async (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = verify(token, process.env.JWT_SECRET)

        const psQuery1 = {
            name: 'CheckIfAccExistsQuery',
            text: 'SELECT * FROM users WHERE accid = $1',
            values: [decoded.accID]
        }
        const result1 = await pool.query(psQuery1)

        if (result1.rowCount === 0 )
            return res.status(400).json({ msg : 'no account with this token exists'})

        const psQuery = {
            name: 'DeleteAccQuery',
            text: 'DELETE FROM users WHERE accid = $1',
            values: [decoded.accID]
        }
        const result = await pool.query(psQuery)
      
        return res.status(200).json({ msg : 'delete successful'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })   
    }
}

module.exports = deleteAcc
