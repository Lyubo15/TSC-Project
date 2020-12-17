const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const CandidatureSchema = new mongoose.Schema({
  
    aboutYou: {
        type: String,
        required: [true, 'Description about you is required'],
    },

    user: {
        type: ObjectId,
        ref: 'User'
    },

    career: {
        type: ObjectId,
        ref: 'Career'
    }
})

module.exports = mongoose.model('Candidature', CandidatureSchema);