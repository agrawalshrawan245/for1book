import express from "express"
import colors from "colors"
import dotenv from "dotenv"

const app = express()

dotenv.config()

app.listen(process.env.PORT, console.log(`Server is listening in ${process.env.NODE_ENV} environment on port ${process.env.PORT}!!`.rainbow))



