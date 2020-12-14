const { Router } = require('express')
const router = Router();

const { isAuthenticated, isUserAnAdmin } = require('../controllers/auth')
const { createCareer, getAll, getCareerById, deleteCareerById, editCareerById, } = require('../controllers/career')

router.post('/create', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await createCareer(req, res);
})

router.delete('/delete/:id', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await deleteCareerById(req, res);
})

router.post('/edit/:id', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await editCareerById(req, res);
})

router.get('/all', async (req, res) => {
    return await getAll(req, res);
})

router.get('/details/:id', async (req, res) => {
    return await getCareerById(req, res);
})

module.exports = router;