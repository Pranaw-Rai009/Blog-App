import { Router } from 'express'
import {registerUser, deleteUserById, getAllUser} from '../controllers/user.controller.js'

const router = Router()

router.post("/register", registerUser)
router.delete("/deleteId", deleteUserById)
router.get("/allUser", getAllUser)

export default router