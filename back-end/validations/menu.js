const Menu = require('../models/menu')

const menuErrorHandler = async (req) => {
    const { name, file, image } = req.body

    let errors = {}

    if (!name) { errors['name'] = 'Name is required' }
    if (name.length > 30) { errors['name'] = 'Name can not be more than 30 characters' }

    if(await Menu.findOne({name}) !== null){ errors[''] = 'Name already exists' }

    validateImage(errors, image, file);
    
    return errors
}

const menuEditErrorHandler = async (req) => {
    const { name, file, image } = req.body

    let errors = {}

    if (name.length > 30) { errors['name'] = 'Name can not be more than 30 characters' }
    
    if(await Menu.findOne({name}) !== null){ errors[''] = 'Name already exists' }

    validateImage(errors, image, file);
    
    return errors
}

const validateImage = (errors, image, file) => {
    const bulb = image && image.slice(image.lastIndexOf('.'));
    if (image && (bulb !== '.png' && bulb !== '.jpg')){  errors['file'] = 'File must be image with png or jpg bulb' }

    const bytes = file && Buffer.byteLength(file, 'utf8');

    if(file && (bytes > 3_500_000)){ errors['file'] = 'File is too big' }
}

module.exports = {
    menuErrorHandler,
    menuEditErrorHandler
}