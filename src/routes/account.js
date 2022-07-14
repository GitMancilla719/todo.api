const express = require('express')
const deleteAcc = require('../controllers/users/deleteAccount')
const getAccounts = require('../controllers/users/getAccounts')
const login = require('../controllers/users/login')
const register = require('../controllers/users/register')
const updateAcc = require('../controllers/users/updateAccount')
const verify_token = require('../helpers/verify_token')

const accRouter = express.Router()

// accRouter.get('/', getAccounts)
accRouter.post('/login', login)
accRouter.post('/register', register)
accRouter.put('/update', verify_token, updateAcc)
accRouter.delete('/delete', verify_token, deleteAcc)

module.exports = accRouter