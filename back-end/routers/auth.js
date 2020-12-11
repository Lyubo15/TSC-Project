const { Router } = require('express')
const router = Router();

const { saveUser, verifyUser, getCurrentUser } = require('../controllers/user')
const { guestAccess, isAuthenticated } = require('../controllers/auth')

router.post('/register', guestAccess, async (req, res) => {
    return await saveUser(req, res)
})

router.post('/signin', guestAccess, async (req, res) => {
    return await verifyUser(req, res);
})

router.get('/authenticate', isAuthenticated, async (req, res) => {
    return await getCurrentUser(req, res);
})

module.exports = router;