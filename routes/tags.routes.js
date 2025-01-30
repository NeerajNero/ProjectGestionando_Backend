import express from 'express'
import { getTags,addTags } from '../controllers/tags.controller.js'
import { authCheck } from '../middleware/authCheck.js'

const router = express.Router()

router.get('/getTags', authCheck, getTags)
router.post('/addTags', authCheck, addTags)

export default router