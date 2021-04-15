const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /user/create
router.post('/create', userController.createUser);

// POST /user/checkUserCredentials
router.post('/checkUserCredentials', userController.checkUserCredentials);

// POST /user/update
router.post('/update', userController.updateUser);

module.exports = router;
