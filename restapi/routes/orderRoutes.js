const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET /order/all
router.get("/all", orderController.getAllOrders);

// // GET /order/:id
// router.get("/:id", orderController.getOrder);

// GET /order/user/:id
router.get("/user/:id", orderController.getOrderByUser);




// // GET /item/:id
// router.get('/:id', orderController.getItem);

// // POST /item/update
// router.post('/update', orderController.updateItem); // protected

// // POST /item/create
// router.post('/create', orderController.createItem); //protected

// // POST /item/delete
// router.post('/delete', orderController.deleteItem); // protected

module.exports = router;