const express = require("express")
const productsRouter = require("./routes/productsRouter")
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = 3000

app.use(express.json())
app.use("/", (req,res) => "Conectado com sucesso")
app.use("/api/products", productsRouter)

const start = async (req, res) => {
    try {
        await mongoose.connect('mongodb+srv://fabiano:1234@cluster0.8p74an4.mongodb.net/BestMinds2024?retryWrites=true&w=majority')
        app.listen(port, () => {
            console.log(`server running at port ${port}`)
        })
    } catch (error) {
        res.send({message: 'Falha na conexão com a base de dados'})
    }
}

start()