import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js"
import { ApiError } from "../utils/apiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const createComment = asyncHandler(async (req, res) => {
    const { postId, content } = req.body

    const userId = req.user._id

    if (!postId) throw new ApiError(400, "Post Id required!")
    if (!content) throw new ApiError(400, "Content cannot be empty!")

    const postExist = await Post.findById(postId)
    if (!postExist) throw new ApiError(404, "Post doesn't exist!")

    const newComment = await Comment.create({
        post: postId,
        user: userId,
        content,
    })
    res.status(200).json({ message: "Comment Created", newComment })
})


export const getCmtOfPost = asyncHandler(async (req, res) => {
    const postId = req.params.id
    if(!postId) throw new ApiError(400, "Post Id required!")

    const allCmt = await Comment.find({post: postId})

    res.status(200).json(allCmt)
})

export const deleteComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id
    
    const deletedCmt = await Comment.findByIdAndDelete(commentId)
    res.status(200).json({message: "Comment deleted!"})

})




