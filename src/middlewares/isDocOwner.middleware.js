import { asyncHandler } from "../MovieSearchApp/src/utils/asyncHandler.util.js";
import {  Post } from "../models/post.model.js";
import { ApiError } from "../utils/apiError.util.js";

export const isDocOwner = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    if(!userId) {
        throw new ApiError(400, "Id missing for verification")
    }

    const docId = req.params.id
    if(!docId) {
        throw new ApiError(400, "Doc Id is missing")
    }

    const isEligible = await Post.findOne({user: userId, _id: docId})
    if(!isEligible) {
        throw new ApiError(401, "Access Denied")
    }
    req.doc = isEligible
    next()

})