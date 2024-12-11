const projects = require('../model/projectModel');
const users = require('../model/userModel');

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

// edit Project details
exports.editProjectController = async (req,res)=>{
    console.log("editAllProjectController");
    // get all project id from reqest params
    const {id} = req.params
    
    const {title,languages,overview,github,website,projectImage} = req.body
    // to get file data req.file
    const reUploadedFileName = req.file?req.file.filename:projectImage
    // to get userId  use middleware
    const userId = req.userId
    console.log(title,languages,overview,github,website,reUploadedFileName,userId);
    
    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,languages,overview,github,website,projectImage:reUploadedFileName,userId},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json(err)
    }
    
}

// remove project
exports.removeProjectController = async (req,res)=>{
    console.log("inside removeProjectController");
    // get id of the project from req params
    const {id} = req.params
    // delete project
    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    } catch (err) {
        res.status(401).json(err)
    }
}

