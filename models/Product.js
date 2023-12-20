const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: String,
    code: String,
    description: String,
    price: Number
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product