import express from 'express'
import { addProject,getProjects } from '../controllers/project.controller.js'
import {authCheck} from '../middleware/authCheck.js'
const router = express.Router()


router.get('/project', authCheck, getProjects)
router.post('/addProject', authCheck, addProject)

export default router