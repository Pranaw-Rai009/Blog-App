import { User } from "../models/user.model";
import { Comment} from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.util";
import { ApiError } from "../utils/apiError.util.js";
import { useId } from "react";

export const canDeleteComment = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const cmtId = req.params.id
    if(!cmtId) throw new ApiError(400, "Comment Id required!")

    const existCmt = await Comment.findById(cmtId)
    if(!cmtId) throw new ApiError(404, "Comment does't exist!")

    const isCmtOwner = existCmt.user.toString() === useId.toString()

    const isPostOwner = await Post.findOne({_id: existCmt.post, user: userId})

    const isAuthorized = isCmtOwner || isPostOwner
    if(!isAuthorized) throw new ApiError(401, "You cannot delete this comment!")
    
    next()
})