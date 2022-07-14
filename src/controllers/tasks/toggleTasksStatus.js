const pool = require("../../config/db")
const dotenv = require('dotenv')
const { verify } = require("jsonwebtoken")
dotenv.config()

const toggleTaskStatus = async (req,res) => {
    try {
        if (req.query.taskid === '' || req.query.taskid === null)
            return res.status(400).json({ msg : 'missing some fields'})

        const token = req.headers.authorization.split(' ')[1]
        const decoded = verify(token, process.env.JWT_SECRET)

        const psQuery = {
            name: 'CheckTaskToToggleQuery',
            text: 'SELECT * FROM tasks WHERE accID = $1 AND taskid = $2 ORDER BY taskID ASC',
            values: [decoded.accID, req.query.taskid]
        }
        const result = await pool.query(psQuery)

        if (result.rowCount === 0)
            return res.status(400).json({ msg : 'task doesnt exists for this user'})

        const psQuery2 = {
            name: 'ToggleTaskStatusQuery',
            text: 'UPDATE tasks SET status = $1 WHERE taskid = $2 AND accid = $3',
            values: [!result.rows[0].status, req.query.taskid, decoded.accID]
        }
        await pool.query(psQuery2)

        return res.status(200).json({ msg : 'status update successful'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })   
    }
}

module.exports = toggleTaskStatus
