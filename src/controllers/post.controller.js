import { Post } from "../models/post.model.js";
import { asyncHandler } from '../utils/asyncHandler.util.js'
import { ApiError } from '../utils/apiError.util.js'

export const createPost = asyncHandler(async (req, res) => {
    const {title, content, tag} = req.body

    if(!title) throw new ApiError(400, "Title is required!")
    if(!content) throw new ApiError(400, "Content must not be empty")

    const newPost = await Post.create({
        title,
        user: req.user._id,
        content,
        tag: tag || []
    })

    res.status(200).json({message: "Post Created", newPost})
})

// export const getAllPost = asyncHandler(async (req, res) => {
//     const allPost = await Post.find()

// })