import { ApiError } from "../utils/apiError.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"
import { User } from '../models/user.model.js'

export const logIn = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if(!email) {
        throw new ApiError(400, "Email cannot be empty!")
    }
    
    if(!password) {
        throw new ApiError(400, "Password cannot be empty!")
    }

    const emailVerify = await User.findOne({email: email})
    if(!emailVerify) {
        throw new ApiError(404, "User with this email doesn't exist!")
    }
    
    const passVerify = await emailVerify.isPasswordCorrect(password)
    if(!passVerify) {
        throw new ApiError(401, "Incorrect Password")
    }

    const refreshToken = emailVerify.generateRefreshToken()
    const accessToken = emailVerify.generateAccesToken()

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
    })

    res.status(200).json({
        accessToken, message: "Login Successfull"
    })
})