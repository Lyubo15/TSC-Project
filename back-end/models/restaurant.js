const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
  
    name: {
        type: String,
        unique: [true, 'Name already exists'],
        required: [true, 'Name is required'],
        maxLength: [30, 'Name can not be more than 50 characters']
    },
    
    address: {
        type: String,
        unique: [true, 'Address already exists'],
        required: [true, 'Address is required']
    },

    fileUrl: {
        type: String
    }
})

module.exports = mongoose.model('Restaurant', RestaurantSchema);