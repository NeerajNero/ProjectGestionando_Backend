import express from 'express'
import { getTasks, addTask, updateTask } from '../controllers/task.controller.js'
import { authCheck } from '../middleware/authCheck.js'

const router = express.Router()

router.get('/getTasks', authCheck, getTasks)
router.post('/addTask', authCheck, addTask)
router.put('/updateTask', authCheck, updateTask)

export default router