import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { errorHandler } from './middlewares/errroHandler.middleware.js'

import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import commentRouter from './routes/comment.routes.js'
import tagRouter from './routes/tag.routes.js'

const app = express()
app.use(cookieParser())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit: "16kb", extended: true}))
app.use(express.static("public"))


app.use("/api/user", userRouter)

app.use("/api/post", postRouter)

app.use("/api/comment", commentRouter)

app.use("/api/tag", tagRouter)

app.use(errorHandler)

export default app