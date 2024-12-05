const projects = require('../model/projectModel')

// add project
exports.addProjectController = async (req,res)=>{
    console.log("inside add ProjectController");
    const userId = req.userId
    console.log(userId);
    console.log(req.body);
    console.log(req.file);
    

    res.status(200).json("add project request recived")
}