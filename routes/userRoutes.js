const router = require('express').Router();
const userController = require('../controllers/userControllers')

//Creating user registration route
router.post('/create', userController.createUser)

//controller (Export) - Routes (Import) - Use - (index.js)

//Exportinng the router
module.exports = router