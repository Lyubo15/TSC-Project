const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  
    name: {
        type: String,
        unique: [true, 'Name already exists'],
        required: [true, 'Name is required'],
        maxlength: [20, 'Name can not be more than 20 chars']
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [100, 'Description can not be more than 100 chars']
    },

    count: {
        type: Number,
        required: [true, 'Count is required'],
        min: [0, 'Count must be positive number']
    },

    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be positive number']
    },

    fileUrl: {
        type: String,
        required: [true, 'Image is required'],
    },
    
})

module.exports = mongoose.model('Product', ProductSchema);