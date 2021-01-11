const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// // GET /item/all
// // router.get("/all", itemController.getAllItems);

// // POST /item/create
// // router.get("/create", itemController.createItem); // protected

// // GET /item/:id
// router.get('/:id', itemController.getItem);

// // POST /item/update
// router.post('/update', itemController.updateItem); // protected

// // POST /item/create
// router.post('/create', itemController.createItem); //protected

// // POST /item/delete
// router.post('/delete', itemController.deleteItem); // protected

// POST /cart/create
router.post('/add', cartController.createCartItem); //protected

// GET /cart/:id
router.get('/get/:id', cartController.getItemsFromId);

// POST /cart/delete
router.post('/delete', cartController.deleteCartItem); // protected

// POST /cart/pay
router.post('/pay', cartController.payCartItems); // protected

module.exports = router;