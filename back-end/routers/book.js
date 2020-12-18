const { Router } = require('express')
const router = Router();

const { isAuthenticated } = require('../controllers/auth')
const { makeABook } = require('../controllers/book')

router.post('/make', isAuthenticated, async (req, res) => {
    return await makeABook(req, res);
})

module.exports = router;