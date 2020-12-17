const mongoose = require('mongoose')

const CareerSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required'],
        maxLength: [50, 'Title can not be more than 50 characters']
    },

    description: {
        type: String,
        required: [true, 'Description is required']
    }
})

module.exports = mongoose.model('Career', CareerSchema);