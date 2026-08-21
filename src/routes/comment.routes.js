import { Router } from 'express'
import { authAcces } from '../middlewares/authAccToken.middleware.js'
import { isDocOwner } from '../middlewares/isDocOwner.middleware.js'
import { canDeleteComment } from '../middlewares/canDelComment.middleware.js'

import { createComment, getCmtOfPost, deleteComment } from '../controllers/comment.controller.js'

const router = Router()

router.post("/create", authAcces, createComment)
router.get("/postCmt", getCmtOfPost)
router.delete("/delete/:id", authAcces, canDeleteComment, deleteComment)


export default router