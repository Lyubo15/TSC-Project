const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },

    countOfPeople: {
        type: Number,
        required: [true, 'Count of people is required'],
    },

    hour: {
        type: String,
        required: [true, 'Hour is required']
    },

    restaurant: {
        type: ObjectId,
        ref: 'Restaurant'
    }
})

module.exports = mongoose.model('Book', BookSchema);