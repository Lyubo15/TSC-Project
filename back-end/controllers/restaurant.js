const Restaurant = require('../models/restaurant')
const { uploads, destroy } = require('./cloudinary')
const { restaurantErrorHandler, restaurantEditErrorHandler } = require('../validations/restaurant')

const createRestaurant = async (req, res) => {
    const errors = restaurantErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({"error": errors})
    }

    const { name, address, file, image } = req.body;

    if(await isRestarantNameAlreadyExists(name, res)){ return res }
    if(await isRestarantAddressAlreadyExists(address, res)){ return res }

    const urlResponse = await uploads(file, getFileName(image));

    if (urlResponse === null) {
        return returnResponseWithSimpleMessage(res, 400, 'Something went wrong with upload the image')
    }

    try {
        const restaurant = new Restaurant({ name, address, fileUrl: urlResponse.secure_url });    
        const restaurantObject = await restaurant.save();
        return res.status(201).send(restaurantObject)
    } catch (err) {
        errors['error'] = err
        return res.status(400).send({"error": errors})
    }
}

const editRestaurantById = async (req, res) => {
    const errors = restaurantEditErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({"error": errors})
    }

    const { name, address, file, image } = req.body;
    const id = req.params.id;
    
    if(await isRestarantNameAlreadyExists(name, res)){ return res }
    if(await isRestarantAddressAlreadyExists(address, res)){ return res }

    const fileName = image && getFileName(image);

    console.log(fileName);

    const urlResponse = file && await uploads(file, fileName);

    let update = {};

    name && (update.name = name)
    address && (update.address = address)
    file && (update.fileUrl = urlResponse.secure_url)

    try{
        const restaurant = await Restaurant.findByIdAndUpdate(id, update, {new: true, runValidators: true});
        return res.status(200).send(restaurant);
    } catch(err) {
        errors['err'] = err.message
        return res.status(400).send({"error": errors})
    }
}

const getAllRestaurants = async (req, res) => {
    const allRestaurants = await Restaurant.find();
    return res.status(200).send(allRestaurants);
}

const deleteRestaurantById = async (req, res) => {
    const id = req.params.id;

    if(await Restaurant.findById(id) === null) {
        return returnResponseWithSimpleMessage(res, 400, `Can not find restaurant with id: ${id}`)
    }

    try {
        const restaurant = await Restaurant.findByIdAndDelete(id)
        await destroy(getFileName(restaurant.fileUrl));
        return res.status(200).send(restaurant)
    } catch (err) {
        return res.status(400).send({"error": err})
    }
}

const getFileName = (image) => {
    if(image.includes('http')){
        return image.slice(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));
    }
    return image.slice(image.lastIndexOf('\\') + 1, image.lastIndexOf('.'));
}

const isRestarantNameAlreadyExists = async (name, res) => {
    if(name && await Restaurant.findOne({name}) != null) {
        res.status(400).send({'error': {"": `Restaurant name ${name} already exists`}})
        return true 
    }
    return false
}

const isRestarantAddressAlreadyExists = async (address, res) => {
    if(address && await Restaurant.findOne({address}) != null) {
        res.status(400).send({'error': {"": `Restaurant address ${address} already exists`}})
        return true 
    }
    return false
}

const returnResponseWithSimpleMessage = (res, status, send) => {
   return res.status(status).send({'error': {"": send}})
}

module.exports = {
    createRestaurant,
    getAllRestaurants,
    deleteRestaurantById,
    editRestaurantById
}