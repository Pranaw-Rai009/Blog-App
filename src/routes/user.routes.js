import { Router } from 'express'
import {registerUser, deleteUserById, getAllUser, getUserById} from '../controllers/user.controller.js'

const router = Router()

router.post("/register", registerUser)
router.delete("/deleteId/:id", deleteUserById)
router.get("/allUser", getAllUser)
router.get("/getUser", getUserById)

export default router