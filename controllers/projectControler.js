const projects = require('../model/projectModel')

// add project
exports.addProjectController = async (req,res)=>{
    console.log("inside add ProjectController");
    const userId = req.userId
    console.log(userId);
    console.log(req.body);
    console.log(req.file);
    const {title,languages,overview,github,website} = req.body
    const projectImage = req.file.filename
    try{
        const existingProject = await projects.findOne({github})
        if (existingProject) {
            res.status(406).json("Project Already exists...Please upload another!!")
        } else {
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get home projects -guest user
exports.getHomeProjectsController = async (req,res)=>{
    console.log("Inside getHomeProjectsCOntroller");
    try {
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get user projects -autherised user
exports.getUserProjectsController = async (req,res)=>{
    console.log("Inside getUserProjectsController");
    const userId = req.userId
    try {
        const allUserProjects = await projects.find({userId})
        res.status(200).json(allUserProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all projects 
exports.getAllProjectsController = async (req,res)=>{
    console.log("Inside getAllProjectsController");

    const searchKey = req.query.search
    try {
        const allProjects = await projects.find({
            languages:{
                $regex:searchKey,$options:"i"
            }
        })
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}