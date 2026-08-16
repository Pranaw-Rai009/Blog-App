import app from './app.js'
import dotenv from 'dotenv'
import { dbConnect } from './db/dbConnect.js'

dotenv.config({
    path: './.env'
})

dbConnect()
.then(() => {
    console.log("Connected to database successfully")

    app.on("error", (error) => {
        console.log("Error occured", error)
        process.exit(1)
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server is ON at port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("Error occured while connecting to database")
})