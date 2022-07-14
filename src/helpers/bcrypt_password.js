const bcrypt = require('bcryptjs')

// use in registration logic
const hash_password = async (password) => {
    if (password === undefined || password === '') {
        throw new Error('Password is empty')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

// use in login logic
const compare_password = async (passwordBody, hashedPasswordDB) => {
    const check_result = await bcrypt.compare(passwordBody, hashedPasswordDB)
    return check_result
}

module.exports = {hash_password, compare_password}