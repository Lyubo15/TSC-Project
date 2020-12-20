const Product = require('../models/product')

const productErrorHandler = async (req) => {
    const { name, description, count, price , file, image } = req.body

    let errors = {}

    if (!name) { errors['name'] = 'Name is required' }
    if (await Product.findOne({name}) !== null) { errors['name'] = 'Name already exists' }
    if (name.length > 20) { errors['name'] = 'Name can not be more than 20 characters' }

    if (!description) { errors['description'] = 'Description is required' }
    if (description.length > 100) { errors['description'] = 'Description can not be more than 100 characters' }

    if (!count) { errors['count'] = 'Count is required' }
    if (count < 0) { errors['count'] = 'Count must be positive number' }

    if (!price) { errors['price'] = 'Price is required' }
    if (price < 0) { errors['price'] = 'Price must be positive number' }

    const bulb = image.slice(image.lastIndexOf('.'));
    if (bulb !== '.png' && bulb !== '.jpg'){
        errors['file'] = 'File must be image with png or jpg bulb'
    }

    if (!file) { errors['file'] = 'File is required' }

    const bytes = Buffer.byteLength(file, 'utf8');

    if(bytes > 3_500_000){
        errors['file'] = 'File is too big'
    }
    
    return errors
}

module.exports = {
    productErrorHandler
}