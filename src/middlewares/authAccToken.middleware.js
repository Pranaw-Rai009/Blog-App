import { ApiError } from "../utils/apiError.util";
import { asyncHandler } from "../utils/asyncHandler.util";
import jwt from 'jsonwebtoken'

export const authAcces = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers["athorization"]
    if(!authHeader) {
        throw new ApiError(400, "Authrization header missing!")
    }

    const accessToken = authHeader.split(" ")[1]
    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    if(!verify) {
        throw new ApiError(401, "Access token cannot be verified!")
    }
    req.user = verify
    next()
})