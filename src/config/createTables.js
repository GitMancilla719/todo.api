const pool = require('./db')

// FOR PRUDUCTION
const createDbTables = async() => {
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

        
    } catch (error) {
        
    }
}

module.exports = createDbTables