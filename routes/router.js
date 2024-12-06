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

// home project get
router.get('/home-projects',ProjectController.getHomeProjectsController)
// user project get
router.get('/user-projects',jwtMiddleware,ProjectController.getUserProjectsController)
// all project get
router.get('/all-projects',jwtMiddleware,ProjectController.getAllProjectsController)

module.exports = router