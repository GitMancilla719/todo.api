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

app.get('/tables', async(req, res) => {
    try {
        const psQuery1 = {
            name: 'CreateTasksTableQuery',
            text: 'CREATE TABLE IF NOT EXISTS tasks(taskID SERIAL,accID text,task text,status boolean,CONSTRAINT tasks_pkey PRIMARY KEY (taskID))'
        }
        const psQuery2 = {
            name: 'CreateTasksTableQuery',
            text: 'CREATE TABLE IF NOT EXISTS users(accID SERIAL,username text,password text,CONSTRAINT users_pkey PRIMARY KEY (accID))'
        }
    
        await pool.query(psQuery1)
        await pool.query(psQuery2)

        return res.status(200).json({ msg: 'tables created'})
    } catch (error) {
        return res.status(500).json(error)
    }
})

app.listen(port, async () => {
    await pool.connect()
    await createDbTables()
    console.log('connect successful')
})