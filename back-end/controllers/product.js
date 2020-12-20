const { productErrorHandler } = require('../validations/product')
const { uploads, destroy } = require('./cloudinary')
const { setProductToMenu } = require('../controllers/menu')

const Product = require('../models/product')

const createProduct = async (req, res) => {
    const errors = await productErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({"error": errors})
    }

    const menuId = req.params.id;

    const { name, description, count, price, file, image } = req.body;

    const urlResponse = await uploads(file, getFileName(image));

    if (urlResponse === null) {
        return returnResponseWithSimpleMessage(res, 400, 'Something went wrong with upload the image')
    }



    try {
        const product = new Product({ name, description , count, price, fileUrl: urlResponse.secure_url });    
        const productObject = await product.save();

        await setProductToMenu(menuId, productObject._id);

        return res.status(201).send(productObject)
    } catch (err) {
        errors['error'] = err
        return res.status(400).send({"error": errors})
    }
}

const getFileName = (image) => {
    if(image.includes('http')){
        return image.slice(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));
    }
    return image.slice(image.lastIndexOf('\\') + 1, image.lastIndexOf('.'));
}


module.exports = {
    createProduct
}