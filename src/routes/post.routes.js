import Router from 'express'
import { createPost } from "../controllers/post.controller.js"
import { authAcces } from '../middlewares/authAccToken.middleware.js'
import { isDocOwner } from '../middlewares/isDocOwner.middleware.js'
const router = Router()

router.post("/create", authAcces, createPost)

export default router