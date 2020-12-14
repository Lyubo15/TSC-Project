const { Router } = require('express')
const router = Router();

const { isAuthenticated, isUserAnAdmin } = require('../controllers/auth')
const { applyForCareer, getAllCanditatures, deleteCandidatureById, getCandidatureById } = require('../controllers/candidature')

router.post('/apply/:id', isAuthenticated, async (req, res) => {
    return await applyForCareer(req, res);
})

router.get('/all', isAuthenticated, isUserAnAdmin, async (req,res) => {
    return await getAllCanditatures(req, res);
})

router.get('/:id', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await getCandidatureById(req, res);
})

router.delete('/delete/:id', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await deleteCandidatureById(req, res);
})

module.exports = router;