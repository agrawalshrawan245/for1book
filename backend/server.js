const express = require("express")
const colors = require("colors")
const path = require("path")
const dotenv = require("dotenv")
const {readdirSync} = require("fs")
const connectDB = require("./database/db.js")


const app = express()

dotenv.config()
connectDB()

app.use(express.json())

app.get("/", (req,res) => { res.send("API is running!!") })

const dirname = path.resolve()

readdirSync("./routes").map((r)=>app.use("/api", require(`./routes/${r}`)))

app.listen(process.env.PORT, console.log(`Server is listening in ${process.env.NODE_ENV} environment on port ${process.env.PORT}!!`.rainbow))



