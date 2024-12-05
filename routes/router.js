const express = require('express')
const userController = require('../controllers/userController')
const loginController = require('../controllers/userController')
const ProjectController = require('../controllers/projectControler')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

const router = new express.Router()

// register -post
router.post('/register',userController.registerController)

// login - post
router.post('/login',userController.loginController)

// add-project Post
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImage'),ProjectController.addProjectController)

module.exports = router