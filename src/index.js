const express = require('express')
const cors = require('cors')
const pool = require('./config/db')
const accRouter = require('./routes/account')
const taskRouter = require('./routes/tasks')
const createDbTables = require('./config/createTables')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/account', accRouter)
app.use('/tasks', taskRouter)

const port = process.env.PORT || 5000




app.listen(port, async () => {
    await pool.connect()
    await createDbTables()
    console.log('connect successful')
})