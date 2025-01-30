import {User} from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const signin = async(req,res,next) => {
    try{
        const {fullName,email,password} = req.body
        if(!fullName || !email || !password){
            return res.status(400).json({error: "All fields are required"})
        }
        const findExistingUser = await User.findOne({email})
        if(findExistingUser){
           return res.status(400).json({error: "email already exists please use a different email"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const createUser = new User({fullName,email,password: hashedPassword})
        const saveUser = await createUser.save()
        const findUser = await User.findById(saveUser._id).select("-password")
        const token = jwt.sign({user: findUser}, process.env.SECRET_KEY, {expiresIn: '15d'})
        res.status(201).json({user: findUser, token})
    }catch(error){
        console.log("error occured while sign up",error)
        next(error)
    }
}

export const login = async(req,res,next) => {
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({error: "All fields are required"})
        }
        const findUserForPasswordCompare = await User.findOne({email})
        if(!findUserForPasswordCompare){
           return res.status(400).json({error: "User doesnt exist please signin"})
        }
        const comparePassword = bcrypt.compare(password,findUserForPasswordCompare.password)
        if(!comparePassword){
           return res.status(400).json({error: "password doesnt match"})
        }
        const findUser = await User.findOne({email}).select("-password")
        const token = jwt.sign({user: findUser}, process.env.SECRET_KEY, {expiresIn: '15d'})
        res.status(200).json({user: findUser, token})
    }catch(error){
        console.log("error occured while login",error)
        next(error)
    }
}

export const logout = async(req,res,next) => {
    try{
        if(!req?.user){
            return res.status(401).json("token not found")
        }
        res.status(200).json({logout: true})
    }catch(error)
    {
        console.log("error occured while logout", error.message)
        next(error)
    }
}

export const getUsers = async(req,res,next) => {
    try{
        const {_id} = req.user
        if(!_id){
            return res.status(400).json("user not authorized")
        }
        const users = await User.find()
        if(users.length === 0){
            return res.status(400).json("no user found")
        }
        res.status(200).json({message: "users fetched successfully", users})
    }catch(error){
        console.log("error occured while fetching users",error.message)
        next(error)
    }
}