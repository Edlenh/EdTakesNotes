const express = require("express");

const server = express()
const apiRoutes = require("./routes/apiRoutes.js")
const htmlRoutes = require("./routes/htmlRoutes")
const PORT = process.env.PORT || 3001

//middlewares
server.use(express.urlencoded({extended:true}));
server.use(express.static('public'))
server.use(express.json())
server.use("/api", apiRoutes)
server.use("/", htmlRoutes)

server.listen(PORT,()=>{
    console.log(`Server: http://localhost:${PORT} is running`)
})

