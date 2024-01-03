
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get("/get", userController.get);


module.exports = router;
