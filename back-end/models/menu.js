const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
  
    name: {
        type: String,
        unique: [true, 'Menu name has already exists'],
        required: [true, 'Name is required'],
    },

    fileUrl: {
        type: String,
        required: [true, 'Image is required'],
    },

    products: [{
        type: ObjectId,
        ref: 'Product'
    }]
})

module.exports = mongoose.model('Menu', MenuSchema);