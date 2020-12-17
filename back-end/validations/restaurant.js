const restaurantErrorHandler = (req) => {
    const { name, address, file, image } = req.body

    let errors = {}

    if (!name) { errors['name'] = 'Name is required' }
    if (name.length > 30) { errors['name'] = 'Name can not be more than 30 characters' }

    if (!address) { errors['address'] = 'Address is required' }

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

const restaurantEditErrorHandler = (req) => {
    const { name, image, file } = req.body

    let errors = {}

    if (name.length > 30) { errors['name'] = 'Name can not be more than 30 characters' }

    const bulb = image && image.slice(image.lastIndexOf('.'));
   
    if (image && (bulb !== '.png' && bulb !== '.jpg')){
        errors['file'] = 'File must be image with png or jpg bulb'
    }

    const bytes = file && Buffer.byteLength(file, 'utf8');

    if(file && (bytes > 3_500_000)){
        errors['file'] = 'File is too big'
    }
    

    return errors
}

module.exports = {
    restaurantErrorHandler,
    restaurantEditErrorHandler
}