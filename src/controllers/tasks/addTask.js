const pool = require("../../config/db")
const dotenv = require('dotenv')
const { verify } = require("jsonwebtoken")
dotenv.config()

const addTask = async (req,res) => {
    try {
        const { task } = req.body

        const token = req.headers.authorization.split(' ')[1]
        const decoded = verify(token, process.env.JWT_SECRET)

        if (task === '') 
            return res.status(400).json({ msg: 'No task to save'})

        const psQuery0 = {
            name: 'CheckAccountQuery',
            text: 'SELECT * FROM users WHERE accID = $1',
            values: [decoded.accID]
        }
        const result0 = await pool.query(psQuery0)

        if (parseInt(result0.rowCount) === 0)
            return res.status(400).json({ msg: 'no account with this token exists'})

        const psQuery = {
            name: 'CheckTotalTaskQuery',
            text: 'SELECT COUNT(task) FROM tasks WHERE accID = $1',
            values: [decoded.accID]
        }
        const result = await pool.query(psQuery)
        
        if (parseInt(result.rows[0].count) >= 20)
            return res.status(400).json({ msg: 'maximum of 20 tasks only'})
        
        const psQuery1 = {
            name: 'AddTaskQuery',
            text: 'INSERT INTO tasks(accid, task, status) VALUES ($1, $2, $3)',
            values: [decoded.accID, task, false]
        }

        await pool.query(psQuery1)

        return res.status(200).json({ msg : 'new tasks added' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })   
    }
}

module.exports = addTask
