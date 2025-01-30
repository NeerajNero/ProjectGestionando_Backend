import express from 'express'
import { getTeams,addTeam } from '../controllers/team.controller.js'
import { authCheck } from '../middleware/authCheck.js'

const router = express.Router()

router.get('/getTeams',authCheck, getTeams)
router.post('/addTeam', authCheck, addTeam)

export default router