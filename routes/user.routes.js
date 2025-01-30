import express from 'express'
import { login,signin,logout,getUsers } from '../controllers/user.controller.js'
import {authCheck} from '../middleware/authCheck.js'
const router = express.Router()

router.post('/login', login)
router.post('/signin', signin)
router.get('/getUser', authCheck, getUsers)
router.post('/logout', authCheck, logout)
export default router