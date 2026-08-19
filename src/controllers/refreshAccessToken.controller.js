import { asyncHandler } from "../utils/asyncHandler.util.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.util.js";
import jwt from "jsonwebtoken";

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(400, "Refresh Token required!")
    }

    let decoded
    try {
        decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    } catch (err) {
        throw new ApiError(401, "Refresh Token Expired!")
    }

    const user = await User.findById(decoded._id)
    if (!user) {
        throw new ApiError(404, "User with this id doesn't exist!")
    }

    const newAccessToken = user.generateAccessToken()
    res.status(200).json({ accessToken: newAccessToken })
})