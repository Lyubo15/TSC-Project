const { Router } = require('express')
const router = Router();

const { isAuthenticated, isUserAnAdmin } = require('../controllers/auth')
const { createMenu, getAllMenues, deleteMenuById, editMenuById, getAllMenuProducts } = require('../controllers/menu')

router.get('/all', async (req, res) => {
    return await getAllMenues(req, res);
})

router.post('/create', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await createMenu(req, res);
})

router.delete('/delete/:id', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await deleteMenuById(req, res);
})

router.post('/edit/:id', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await editMenuById(req, res);
})

router.get('/:id/products', async (req, res) => {
    return await getAllMenuProducts(req, res);
})

module.exports = router;