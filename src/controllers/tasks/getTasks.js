const pool = require("../../config/db")

const getTasks = async (req,res) => {
    try {
        const psQuery1 = {
            name: 'getUsersQuery',
            text: 'SELECT * FROM tasks ORDER BY taskID ASC'
        }

        const result = await pool.query(psQuery1)

        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error })   
    }
}

module.exports = getTasks
