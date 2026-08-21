import { Router } from 'express'
import {createTag} from '../controllers/tag.controller.js'
import { authAcces } from '../middlewares/authAccToken.middleware.js'
const router = Router()

router.post("/create", authAcces, createTag)

export default router