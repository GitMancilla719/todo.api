const pool = require("../../config/db")

const getAccounts = async (req,res) => {
    try {
        const psQuery1 = {
            name: 'getUsersQuery',
            text: 'SELECT * FROM users ORDER BY accID ASC'
        }

        const result = await pool.query(psQuery1)

        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error })   
    }
}

module.exports = getAccounts
