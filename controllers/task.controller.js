import {Task} from '../models/task.model.js'

export const addTask = async(req,res,next) => {
    try{
        const {_id} = req?.user
        if(!_id){
            return res.status(401).json("user not authorized")
        }
        const {name,project,team,owners,tags,timeToComplete,status} = req.body.taskData
        if(!name && !project && !owners && status && team){
            return res.status(400).json("all fields are required")
        } 
        const createTask = new Task({name,project,team,owners,tags,timeToComplete,status})
        const saveTask = await createTask.save()
        if(!saveTask){
            return res.status(400).json("error occured while saving task")
        }
        const findTask = await Task.findById(saveTask._id).populate(["project", "team", "owners"])
        res.status(201).json({message: "Task created successfully", task: findTask})
    }catch(error)
    {
        console.log("error occured while adding task", error.message)
        next(error)
    }
}

export const getTasks = async(req,res,next) => {
    try{
        const {_id} = req?.user
        if(!_id){
            return res.status(401).json("user not authorized")
        }
        const getAllTasks = await Task.find().populate(["project", "team", "owners"])
        if(getAllTasks.length === 0){
            res.status(400).json("no task found please add task")
        }
        res.status(200).json({message: "tasks fetched successfully", task: getAllTasks})
    }catch(error){
        console.log("error occured while fetching tasks", error.message)
        next(error)
    }
}

export const updateTask = async(req,res,next) => {
    try{
        const {taskId} = req.body
        if(!taskId){
            return res.status(400).json("Task Id not available")
        }
        const findTask = await Task.findByIdAndUpdate(taskId, {status: "Completed"},{new:true})
        if(!findTask){
            return res.status(404).json("Task not not found")
        }
        res.status(200).json({message: "update successfull", task: findTask})
    }catch(error){
        console.log("error occured while updating",error.message)
        next(error)
    }
}