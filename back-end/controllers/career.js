const {careerErrorHandler, careerEditErrorHandler} = require('../validations/career')
const { deleteAllCandidaturesByCareerName } = require('../controllers/candidature')
const Career = require('../models/career')

const createCareer = async (req, res) => {
    const errors = await careerErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({"error": errors})
    }

    const { title, description } = req.body;

    const career = new Career({ title, description });

    try {
        const careerObject = await career.save();
        return res.status(201).send({'career': careerObject})
    } catch (err) {
        errors['error'] = err
        return res.status(400).send({"error": errors})
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
        return returnResponseWithSimpleMessage(res, 400, `Can not find career with id: ${id}`)
    }
}

const isCareerExist = async (id) => {
    const career = await Career.findById(id);
    return career === null ? false : true;
}

const deleteCareerById = async (req, res) => {
    const id = req.params.id;

    try{
        const career = await Career.findByIdAndDelete(id)
        deleteAllCandidaturesByCareerName(career._id);
        return res.status(200).send(career);
    } catch(err) {
        return returnResponseWithSimpleMessage(res, 400, `Can not find career with id: ${id}`)
    }
}

const editCareerById = async (req, res) => {
    const id = req.params.id;
    const errors = await careerEditErrorHandler(req, id)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({"error": errors})
    }

    try{
        const career = await Career.findByIdAndUpdate(id, req.body, {runValidators: true});
        return res.status(200).send(career);
    } catch(err) {
        errors['err'] = err.message
        return res.status(400).send({"error": errors})
    }
}

const returnResponseWithSimpleMessage = (res, status, send) => {
    return res.status(status).send({'error': {"": send}})
}

module.exports = {
    createCareer,
    getAll,
    getCareerById,
    deleteCareerById,
    editCareerById,
    isCareerExist
}