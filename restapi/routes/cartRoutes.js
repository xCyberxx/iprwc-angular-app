const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// POST /cart/create
router.post('/add', cartController.createCartItem); //protected

// GET /cart/:id
router.get('/get/:id', cartController.getItemsFromId);

// POST /cart/delete
router.post('/delete', cartController.deleteCartItem); // protected

// POST /cart/pay
router.post('/pay', cartController.payCartItems); // protected

module.exports = router;