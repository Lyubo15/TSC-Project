const { menuErrorHandler, menuEditErrorHandler } = require('../validations/menu')
const { uploads, destroy } = require('./cloudinary')

const Menu = require('../models/menu')

const createMenu = async (req, res) => {
    const errors = await menuErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({"error": errors})
    }

    const { name, file, image } = req.body;

    const urlResponse = await uploads(file, getFileName(image));

    if (urlResponse === null) {
        return returnResponseWithSimpleMessage(res, 400, 'Something went wrong with upload the image')
    }

    try {
        const menu = new Menu({ name, fileUrl: urlResponse.secure_url });    
        const menuObject = await menu.save();
        return res.status(201).send(menuObject)
    } catch (err) {
        errors['error'] = err
        return res.status(400).send({"error": errors})
    }
}

const editMenuById = async (req, res) => {
    const errors = await menuEditErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({"error": errors})
    }

    const id = req.params.id;
    const { name, file, image } = req.body;

    const fileName = image && getFileName(image);
    const urlResponse = file && await uploads(file, fileName);

    let update = {};

    name && (update.name = name)
    file && (update.fileUrl = urlResponse.secure_url)

    try{
        const menu = await Menu.findByIdAndUpdate(id, update, {new: true, runValidators: true});
        return res.status(200).send(menu);
    } catch(err) {
        errors['err'] = err.message
        return res.status(400).send({"error": errors})
    }
}

const deleteMenuById = async (req, res) => {
    const id = req.params.id;

    if(await Menu.findById(id) === null) {
        return returnResponseWithSimpleMessage(res, 400, `Can not find menu with id: ${id}`)
    }

    try {
        const menu = await Menu.findByIdAndDelete(id)
        await destroy(getFileName(menu.fileUrl));
        return res.status(200).send(menu)
    } catch (err) {
        return res.status(400).send({"error": err})
    }
}

const setProductToMenu = async (menuId, productId) => {
    await Menu.findByIdAndUpdate(menuId, {
        $addToSet: {
            products: [productId]
        }
    })
}

const getAllMenues = async (req, res) => {
    const allMenues = await Menu.find();
    return res.status(200).send(allMenues);
}

const getAllMenuProducts = async (req, res) => {
    const id = req.params.id;
    const menu =  await Menu.findById(id).populate('products', 'name fileUrl price');
    return res.status(200).send(menu.products);
}

const returnResponseWithSimpleMessage = (res, status, send) => {
    return res.status(status).send({'error': {"": send}})
}

const getFileName = (image) => {
    if(image.includes('http')){
        return image.slice(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));
    }
    return image.slice(image.lastIndexOf('\\') + 1, image.lastIndexOf('.'));
}

module.exports = {
    createMenu,
    getAllMenues,
    deleteMenuById,
    editMenuById,
    setProductToMenu,
    getAllMenuProducts
}