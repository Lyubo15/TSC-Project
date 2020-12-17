const { Router } = require('express')
const router = Router();

const { isAuthenticated, isUserAnAdmin } = require('../controllers/auth')
const { createRestaurant, getAllRestaurants, deleteRestaurantById, editRestaurantById } = require('../controllers/restaurant')

router.get('/all', async (req, res) => {
    return await getAllRestaurants(req, res);
})

router.post('/create', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await createRestaurant(req, res);
})

router.post('/edit/:id', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await editRestaurantById(req, res);
})

router.delete('/delete/:id', isAuthenticated, isUserAnAdmin, async (req, res) => {
    return await deleteRestaurantById(req, res);
})

module.exports = router;