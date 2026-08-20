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


// Work Test
export const getAllPost = asyncHandler(async (req, res) => {
    const userId = req.user._id
    if(!userId) throw new ApiError(400, "User Id required")
    const allPost = await Post.findOne({user: userId})

    if(!allPost) throw new ApiError(404, "No post related to the user")
    
    res.status(209).json(allPost)

})

export const updatePost = asyncHandler(async (req, res) => {
    const postId = req.params.id
    const {title, content, tag} = req.body
    const updatedPost = await Post.findByIdAndUpdate(postId, {
        title,
        content,
        tag,
    }, { returnDocument: 'after'})
    if(!updatedPost) throw new ApiError(404, "Post not found")
    
    res.status(200).json(updatedPost)
})

// export const getPostById = asyncHandler(async (req, res) => {
//     const postId = req.params.id
    
//     const post = await Post.findById(postId)
//     if(!post) throw new ApiError(404, "Post doesn't exist!")
    
//     res.status(200).json(post)
// })