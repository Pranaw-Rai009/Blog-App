import Router from 'express'
import { createPost, getAllPost, updatePost } from "../controllers/post.controller.js"
import { authAcces } from '../middlewares/authAccToken.middleware.js'
import { isDocOwner } from '../middlewares/isDocOwner.middleware.js'
const router = Router()

router.post("/create", authAcces, createPost)
router.get("/getAll/:id", authAcces, getAllPost)
router.patch("/update/:id", authAcces, isDocOwner, updatePost)

export default router