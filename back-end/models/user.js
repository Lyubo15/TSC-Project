// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        unique: true,
        required: [true, {message: 'First Name is required'}],
        minLength: [2, 'First Name must be least 2 characters']
    },

    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        minLength: [2, 'Last Name must be least 2 characters']
    },

    email: {
        type: String,
        required: [true, {message :'Email is required'}],
        pattern: [/^[a-zA-Z0-9\.-_]{3,}@\w+\.(com|bg)$/, 'Email is not valid']
    },

    tel: {
        type: String,
        require: [true, 'Phone Number is required'],
        minLength: [10],
        maxLength: [10, 'Phone Number must be exactly 10 symbols']
    },

    password: {
        type: String,
        require: [true, 'Password is required'],
        minLength: [5, 'Password must be least 5 symbols']
    },

    userRole: {
        type: String,
    }
})

module.exports = mongoose.model('User', UserSchema);