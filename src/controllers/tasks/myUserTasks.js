const pool = require("../../config/db")
const dotenv = require('dotenv')
const { verify } = require("jsonwebtoken")
dotenv.config()

const getUserTasks = async (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = verify(token, process.env.JWT_SECRET)

        const psQuery = {
            name: 'CheckTotalUserTaskQuery',
            text: 'SELECT * FROM tasks WHERE accID = $1 ORDER BY taskID ASC',
            values: [decoded.accID]
        }
        const result = await pool.query(psQuery)

        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error })   
    }
}

module.exports = getUserTasks
