const User = require('../models/user')

module.exports = userErrorHandler = async (req) => {
    const { firstName, lastName, email, tel, password, rePassword } = req.body

    let errors = {}

    if (firstName.length < 2) {
        errors['firstName'] = 'First Name must be least 2 characters'
    }

    if (lastName.length < 2) {
        errors['lastName'] = 'Last Name must be least 2 characters'
    }

    const user = await User.findOne({ firstName })
    if (user) {
      errors['firstName'] = 'First Name already exist'
    }

    if(!email.match(/^[a-zA-Z0-9\.-_]{3,}@\w+\.(com|bg)$/)){
        errors['email'] = 'Email is not valid'
    }

    if(tel.length < 10 || tel.length > 10) {
        errors['tel'] = 'Phone number must be exactly 10 symbols'
    }

    if(password.length < 5){
        errors['password'] = 'Password must be least 5 characters'
    }

    if(JSON.stringify(password) !== JSON.stringify(rePassword)){
        errors['rePassword'] = 'Passwords do not match'
    }

    return errors
}