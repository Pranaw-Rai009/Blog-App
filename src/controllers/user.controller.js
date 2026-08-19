import { User } from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.util.js'
import { ApiError } from '../utils/apiError.util.js'

export const registerUser = asyncHandler(async function (req, res) {
    const { fullName, userName, email, password } = req.body
    if (!fullName || !userName || !email || !password) {
        throw new ApiError(400, "All fields are required!")
    }

    const existUser = await User.findOne({ $or: [{ email: email }, { userName: userName }] })
    if (existUser) {
        if (existUser.email === email) {
            throw new ApiError(409, "User with this email already exists!")
        } else {
            throw new ApiError(409, "User name is already taken!")
        }
    }

    const register = await User.create({
        fullName,
        userName,
        email,
        password
    })

    res.status(201).json({ message: "User Registered" })
})

export const deleteUserById = asyncHandler(async (req, res) => {
    const id = req.params.id
    if(!id) {
        throw new ApiError(400, "User id required!")
    }

    const exist = await User.findById(id)
    if(!exist) {
        throw new ApiError(404, "The user doesn't exist!")
    }

    await User.findByIdAndDelete(id)
    res.status(200).json({message: "Deleted"})
})

export const getAllUser = asyncHandler(async (req, res) => {
    const allUser = await User.find()
    if(allUser.length === 0) {
        throw new ApiError(404, "No users foudn")
    } else {
        res.status(200).json({allUser})
    }
})