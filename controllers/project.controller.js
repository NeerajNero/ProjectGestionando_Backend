
import { Project } from "../models/project.model.js"
export const addProject = async(req,res,next) => {
    try{
        const {_id} = req.user
        if(!_id){
            return res.status(400).json("user not authenticated")
        }
        const {name,description} = req.body
        if(!name && !description){
            return res.status(400).json("all fields are required")
        }
        const createProject = new Project({name,description})
        await createProject.save()
        const project = await Project.find()
        res.status(201).json({message: "project Created", project: project[project.length-1]})
    }catch(error){
        console.log("error occured while adding project",error.message)
        next(error)
    }
}

export const getProjects = async(req,res,next) => {
    try{
        const {_id} = req.user
        if(!_id){
            return res.status(400).json("user not authenticated")
        }
        const getAllProjects = await Project.find()
        if(!getAllProjects){
            res.status(400).json({error: "No projects present please add projects"})
        }
        res.status(200).json({project: getAllProjects})
    }catch(error){
        console.log("error occured while fetching projects", error.message)
        next(error)
    }
}