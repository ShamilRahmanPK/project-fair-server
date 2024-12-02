//Loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const  pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)

const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Project Fair server started at port : ${PORT} and waiting for client request!!!`);
})

pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>Project Fair server started at port and waiting for client request</h1>`)
})
