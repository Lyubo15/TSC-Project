const careerErrorHandler = require('../validations/career')
const Career = require('../models/career')


const createCareer = async (req, res) => {
    const errors = await careerErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send(errors)
    }

    const { title, description } = req.body;

    career = new Career({ title, description });

    try {
        const careerObject = await career.save();
        return res.status(201).send({'career': careerObject})
    } catch (err) {
        errors['error'] = err
        return res.status(400).send(errors)
    }
}

const getAll = async (req, res) => {
    const allCareers = await Career.find();
    return res.status(200).send(allCareers);
}

const getCareerById = async (req, res) => {
    const id = req.params.id;

    try{
        const career = await Career.findById(id)
        return res.status(200).send(career);
    } catch(err) {
        return res.status(404).send({'message': `Can not find career with id: ${id}`})
    }
}

const deleteCareerById = async (req, res) => {
    const id = req.params.id;

    try{
        const career = await Career.findByIdAndDelete(id)
        return res.status(200).send(career);
    } catch(err) {
        return res.status(404).send({'message': `Can not find career with id: ${id}`})
    }
}

const editCareerById = async (req, res) => {
    const id = req.params.id;
    const errors = await careerErrorHandler(req)

    if(await Career.findById(id) === null) {
        return res.status(404).send({'message': `Can not find career with id: ${id}`})
    }

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send(errors)
    }

    const {title, description} = req.body
    let update = {};

    Object.entries(req.body).filter(input => input !== "").map(input => update[input] = input);

    console.log(update);

    title && (update.title = title)
    description && (update.description = description)

    try{
        const career = await Career.findOneAndUpdate(id, update, {new: true, runValidators: true});
        return res.status(200).send(career);
    } catch(err) {
        errors['err'] = err.message
        return res.status(400).send(errors)
    }
}

module.exports = {
    createCareer,
    getAll,
    getCareerById,
    deleteCareerById,
    editCareerById
}