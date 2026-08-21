import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiError } from "../utils/apiError.util.js";
import { Tag } from '../models/tags.model.js'

export const createTag = asyncHandler(async (req, res) => {
    const { name } = req.body
    if (!name) throw new ApiError(400, "Tag name required!")

    const normalizedName = name.toLowerCase().trim()
    const existTag = await Tag.findOne({ name: normalizedName })
    if (existTag) throw new ApiError(409, "Tag already exist!")

    const newTag = await Tag.create({ name })
    res.status(201).json({ message: "Created new tag", tag: newTag })
})