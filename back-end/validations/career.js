const Career = require('../models/career')

const careerErrorHandler = async (req) => {
    const { title, description } = req.body

    let errors = {}

    if (!title) { errors['title'] = 'Title is required' }
    if (title.length > 50) { errors['title'] = 'Title can not be more than 50 characters' }

    if (!description) { errors['description'] = 'Description is required' }

    return errors
}

const careerEditErrorHandler = async (req, id) => {
    const { title } = req.body
    
    let errors = {}
    
    if (title.length > 50) { 
        errors['title'] = 'Title can not be more than 50 characters'
    }

    if(await Career.findById(id) === null) {
         errors['career'] = `Can not find career with id: ${id}`
    }
    
    return errors
}

module.exports = {
    careerErrorHandler,
    careerEditErrorHandler
}