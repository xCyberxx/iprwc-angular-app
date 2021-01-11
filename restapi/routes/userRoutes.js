const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /user/create
router.post('/create', userController.createUser);

// POST /user/checkUserCredentials
router.post('/checkUserCredentials', userController.checkUserCredentials);

// POST /user/update
router.post('/update', userController.updateUser);

// // GET /user/all
// router.get('/all', userController.getAllUsers);

// // GET /user/:id
// router.get('/:id', userController.getUser);

// // POST /user/checkUserCredentials
// router.post('/checkUserCredentials', userController.checkUserCredentials);

// // POST /user/resetPassword
// router.post('/resetPassword', userController.resetPassword);

// // POST /user/create
// router.post('/create', userController.createUser);

// // POST /user/update
// router.post('/update', userController.updateUser);

// // POST /user/delete
// router.post('/delete', userController.deleteUser);

module.exports = router;
