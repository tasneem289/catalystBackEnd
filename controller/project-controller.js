const {validationResult} = require('express-validator');
const Project = require('../model/project');
const appError = require('../utility/appError');
const project = require('../model/project');

const getAllProjects = async (req,res,next) => {
  try{
    const projects=await Project.find();
    res.json(projects);
  }  catch(err){
    next(err);
    return res.status(404).json("error:",err)
  }
};

const getProject = async (req, res, next) => {
     try{
        const project = await Project.findById(req.params.id);
        if(!project) {
            const error = appError.create('project not found', 404, "FAIL :mafesh project ya sahby")
            return next(error);
        }
        return res.json({ status: "SUCCESSFULLY GETTING", data: {project}, users:Project.user});
      }catch(err){
        const error = appError.create(' Project not found', 404)
        return next(error);
      }
};

const addProject = async (req, res, next) => {
  try {
      /*
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          const error = appError.create(errors.array(), 400, "Validation Error");
          return next(error);
      }

      */
      const newProject = new Project(req.body);
      await newProject.save();
      res.status(201).json({ status: "SUCCESS", data: { project: newProject } });
  } catch (error) {
      const customError = appError.create(error.message, 500, "Internal Server Error");
      return next(customError);
  }
}

const updateProject = async (req, res, next) => {
  try {
    const _id = req.params.id;  
    const updatedproject = await Project.updateOne({_id: _id}, {$set: {...req.body}});  
    return res.status(200).json({status: 'SUCCESSFULLY UPDATED', Project: updatedproject});
  } catch(err) {
    const error = appError.create('project not found', 404, 'FAIL');
    return next(error);
  }
};

const deleteProject = async (req, res) => {
  try{
    await Project.deleteOne({_id: req.params.id});
    res.status(200).json({status: "SUCCESSFULLY DELETED"});
  }catch(error){
    const err =  appError.create(' Project not found', 404)
    return next(err);
  }
};

module.exports = {
       addProject,
       updateProject,
       getAllProjects,
       getProject,
       deleteProject
}