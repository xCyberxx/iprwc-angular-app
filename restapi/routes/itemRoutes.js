const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// GET /item/all
router.get("/all", itemController.getAllItems);

// POST /item/create
router.get("/create", itemController.createItem);

// GET /item/:id
router.get('/:id', itemController.getItem);

// POST /item/update
router.post('/update', itemController.updateItem);

// POST /item/create
router.post('/create', itemController.createItem);

// POST /item/delete
router.post('/delete', itemController.deleteItem);

module.exports = router;