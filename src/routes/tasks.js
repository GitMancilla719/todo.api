const express = require('express')
const getTasks = require('../controllers/tasks/getTasks')
const addTask = require('../controllers/tasks/addTask')
const getUserTasks = require('../controllers/tasks/myUserTasks')
const updateTask = require('../controllers/tasks/updateTasks')
const deleteTask = require('../controllers/tasks/deleteTasks')
const toggleTaskStatus = require('../controllers/tasks/toggleTasksStatus')
const verify_token = require('../helpers/verify_token')

const taskRouter = express.Router()

// taskRouter.get('/', verify_token, getTasks)
taskRouter.get('/mytasks', verify_token, getUserTasks)
taskRouter.post('/add', verify_token, addTask)
taskRouter.put('/update', verify_token, updateTask)
taskRouter.delete('/delete', verify_token, deleteTask)
taskRouter.patch('/toggleStatus', verify_token, toggleTaskStatus)

module.exports = taskRouter