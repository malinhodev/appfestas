//modules
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

//routes


//middlewares


//config
const dbName = "partytime"
const port = 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

//CONEXÃO MONGODB
mongoose.connect(
    `mongodb://localhost/${dbName}`,
  
)


app.get("/", (req,res)=>{
    res.json({message:"rota teste!"})
})

app.listen(port,()=>{
    console.log(`O backend está rodando na porta: ${port}`)
})
