const { candidatureErrorHandler } = require('../validations/candidature')
const { isCareerExist } = require('../controllers/career')
const { isUserExists } = require('../controllers/user')

const Candidature = require('../models/candidature')
const Career = require('../models/career')

const applyForCareer = async (req, res) => {
    const errors = candidatureErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({"error": errors})
    }
    
    const { aboutYou, userId } = req.body
    const careerId = req.params.id;

    if (await Career.findById(careerId) === null) {
        return returnResponseWithSimpleMessage(res, 404, `Can not find career with id: ${id}`)
    }

    if (!(await isUserExists(userId))) {
        return returnResponseWithSimpleMessage(res, 404, `Can not find user with id: ${id}`)
    }

    try {
        const candidature = new Candidature({ aboutYou, 'user': userId, 'career': careerId })
        const candidatureObject = await candidature.save();
        return res.status(201).send({ 'candidature': candidatureObject })
    } catch (err) {
        errors['error'] = err
        return res.status(400).send({"error": errors})
    }
}

const getAllCanditatures = async (req, res) => {
    const allCandidatures = await Candidature.find().populate('user', 'firstName lastName').populate('career', 'title');
    return res.status(200).send(allCandidatures);
}

const getCandidatureById = async (req, res) => {
    const id = req.params.id;

    if (await Candidature.findById(id) === null) {
        return returnResponseWithSimpleMessage(res, 404, `Can not find candidature with id: ${id}`)
    }

    try {
        const candidature = await Candidature
            .findById(id)
            .populate('user', 'firstName lastName email tel')
            .populate('career', 'title description')

        return res.status(200).send(candidature);
    } catch (err) {
        errors['err'] = err
        return res.status(400).send({"error": errors})
    }
}

const deleteCandidatureById = async (req, res) => {
    const id = req.params.id;
    try {
        const candidature = await Candidature.findByIdAndDelete(id)
        return res.status(200).send(candidature);
    } catch (err) {
        return returnResponseWithSimpleMessage(res, 404, `Can not find candidature with id: ${id}`)
    }
}

const deleteAllCandidaturesByCareerName = async (id) => {
    await Candidature.deleteMany({ 'career': id });
}

const returnResponseWithSimpleMessage = (res, status, send) => {
    return res.status(status).send({'error': {"": send}})
}

module.exports = {
    applyForCareer,
    getAllCanditatures,
    deleteCandidatureById,
    getCandidatureById,
    deleteAllCandidaturesByCareerName
}