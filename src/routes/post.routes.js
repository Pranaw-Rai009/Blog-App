import Router from 'express'
import { createPost, getMyPost, updatePost, getPostById, deletePostById } from "../controllers/post.controller.js"
import { authAcces } from '../middlewares/authAccToken.middleware.js'
import { isDocOwner } from '../middlewares/isDocOwner.middleware.js'
const router = Router()

router.post("/create", authAcces, createPost)
router.get("/getAll/:id", authAcces, getMyPost)
router.patch("/update/:id", authAcces, isDocOwner, updatePost)
router.get("/getPost/:id", authAcces, isDocOwner, getPostById)
router.get("/delete/:id", authAcces, isDocOwner, deletePostById)
// router.get("/others/:id", getOthersPostById)

export default router