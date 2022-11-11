const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv")
const {readdirSync} = require("fs")
const connectDB = require("./database/db.js")


const app = express()

dotenv.config()
// connectDB()


readdirSync("./routes").map((r)=>app.use("/api", require(`./routes/${r}`)))

app.listen(process.env.PORT, console.log(`Server is listening in ${process.env.NODE_ENV} environment on port ${process.env.PORT}!!`.rainbow))



