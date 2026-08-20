import { Router } from 'express'
import {registerUser, deleteUserById, getAllUser, getUserById, updateUserById, updatePassword} from '../controllers/user.controller.js'
import { logIn } from '../controllers/login.controller.js'
import { authAcces } from '../middlewares/authAccToken.middleware.js'
import { isDocOwner } from '../middlewares/isDocOwner.middleware.js'
import { refreshAccessToken } from '../controllers/refreshAccessToken.controller.js'

const router = Router()

router.post("/register", registerUser)
router.post("/login", logIn)
router.post("/refreshAccToken", refreshAccessToken)
router.delete("/delete/:id", authAcces, deleteUserById)
router.get("/allUser", authAcces, getAllUser)
router.get("/getUser/:id", authAcces, getUserById)
router.patch("/update/:id", authAcces, updateUserById)
router.put("/passwordUpdate", authAcces, updatePassword)

export default router