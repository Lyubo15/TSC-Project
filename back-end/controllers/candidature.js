const { candidatureErrorHandler } = require('../validations/candidature')
const Career = require('../models/career')
const User = require('../models/user')
const Candidature = require('../models/candidature')

const applyForCareer = async (req, res) => {
    const careerId = req.params.id;
    const errors = candidatureErrorHandler(req)
    const { aboutYou, userId } = req.body

    if (await Career.findById(careerId) === null) {
        return res.status(404).send({
            'error': `Can not find career with id: ${id}`
        })
    }

    if (await User.findById(userId) === null) {
        return res.status(404).send({
            'error': `Can not find user with id: ${id}`
        })
    }

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({
            'error': errors
        })
    }

    try {
        const candidature = new Candidature({ aboutYou, 'user': userId, 'career': careerId })
        const candidatureObject = await candidature.save();
        return res.status(201).send({ 'candidature': candidatureObject })
    } catch (err) {
        errors['error'] = err
        return res.status(400).send({
            'error': errors
        })
    }
}

const getAllCanditatures = async (req, res) => {
    const allCandidatures = await Candidature.find().populate('user', 'firstName lastName').populate('career', 'title');
    return res.status(200).send(allCandidatures);
}

const getCandidatureById = async (req, res) => {
    const id = req.params.id;

    if (await Candidature.findById(id) === null) {
        return res.status(404).send({ 'error': `Can not find user with id: ${id}` })
    }

    try {
        const candidature = await Candidature
            .findById(id)
            .populate('user', 'firstName lastName email tel')
            .populate('career', 'title description')

        return res.status(200).send(candidature);
    } catch (err) {
        return res.status(400).send({
            'error': errors
        })
    }
}

const deleteCandidatureById = async (req, res) => {
    const id = req.params.id;
    try {
        const candidature = await Candidature.findByIdAndDelete(id)
        return res.status(200).send(candidature);
    } catch (err) {
        return res.status(404).send({
            'error': `Can not find candidature with id: ${id}`
        })
    }
}

const deleteAllCandidaturesByCareerName = async (id) => {
    const deletedCandidatures = await Candidature.deleteMany({ 'career': id });
    console.log(deletedCandidatures)
}

module.exports = {
    applyForCareer,
    getAllCanditatures,
    deleteCandidatureById,
    getCandidatureById,
    deleteAllCandidaturesByCareerName
}