import { Tags } from "../models/tags.model.js";

export const addTags = async(req,res,next) => {
    try{
        const {_id} = req.user
        if(!_id){
            return res.status(401).json("user not authenticated")
        }
        const {name} = req.body
        if(!name){
            return res.status({error: "name is required"})
        }
        const createTag = new Tags({name})
        const saveTag = await createTag.save()
        if(!saveTag){
            return res.status(500).json({error: "unable to save tag"})
        }
        res.status(201).json({message: "tag created", tag: saveTag})
    }catch(error){
        console.log("error occured while adding tags", error.message)
        next(error)
    }
}

export const getTags = async(req,res,next) => {
    try{
        const {_id} = req.user
        if(!_id){
            return res.status(401).json("user not authenticated")
        }
        const getTags = await Tags.find()
        if(!getTags){
            return res.status(404).json("tags not found please add tags")
        }
        res.status(200).json({message: "tags found", tags: getTags})
    }catch(error){
        console.log("error occured while fecthing tags",error.messsage)
        next(error)
    }
}
