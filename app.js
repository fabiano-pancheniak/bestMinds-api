const express = require("express")
const productsRouter = require("./routes/productsRouter")
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = 3000

app.use(express.json())
app.use("/api/products", productsRouter)

const start = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONN)
        app.listen(port, () => {
            console.log(`server running at port ${port}`)
        })
    } catch (error) {
        res.send({message: 'Falha na conexão com a base de dados'})
    }
}

start()