import { Team } from "../models/team.model.js";

export const addTeam = async(req,res,next) => {
    try{
        const {_id} = req.user
        if(!_id){
            return res.status(400).json("user not authenticated")
        }
        const {name,description} = req.body
        if(!name && !description){
            return res.status(500).json("all fields are required")
        }
        const createTeam = new Team({name,description})
        const saveTeam = await createTeam.save()
        if(!saveTeam){
            return res.status(500).json({error: "unable to save team"})
        }
        res.status(201).json({message: "team created", team: saveTeam})
    }catch(error){
        console.log("error occured while addTeam", error.message)
        next(error)
    }
}

export const getTeams = async(req,res,next) => {
    try{
        const {_id} = req.user
        if(!_id){
            return res.status(400).json("user not authenticated")
        }
        const getTeams = await Team.find()
        if(getTeams.length === 0){
            res.status(400).json("no teams found please add teams")
        }
        res.status(200).json({teams: getTeams})
    }catch(error){
        console.log("error occured while fetching teams", error.message)
        next(error)
    }
}