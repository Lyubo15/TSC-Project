const { Router } = require('express')
const router = Router();

const { isAuthenticated, isUserAnAdmin } = require('../controllers/auth')
const { createProduct } = require('../controllers/product')

router.post('/create/:id', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await createProduct(req, res);
})


module.exports = router;