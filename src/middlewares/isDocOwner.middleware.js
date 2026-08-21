import { asyncHandler } from "../utils/asyncHandler.util.js";
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

    const postExist = await Post.findOne({id: docId})
    if(!postExist) throw new ApiError (404, "No such post")
        
    const isEligible = await Post.findOne({user: userId, _id: docId})
    if(!isEligible) {
        throw new ApiError(401, "Access Denied", ["you are not the owner"])
    }
    req.doc = isEligible
    next()

})