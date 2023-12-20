const Product = require("../models/Product")
const mongoose = require('mongoose')
const asyncHandler = require("express-async-handler")
require('dotenv').config()

exports.getProducts = asyncHandler(async (req,res) => {       
        const products = await Product.find({})
        res.status(200).json({ products })   
})

exports.getProductById = asyncHandler(async (req,res) => {
    const productID = req.params.id
    
    if(!mongoose.Types.ObjectId.isValid(productID)){   
        return res.status(404).json({message: `Product ${productID} not found`})
    }
    
    const product = await Product.findOne({_id: productID})
    
    if(!product){
        return res.status(404).json({message: `Product ${productID} not found`})
    }

    res.status(200).json({product})
})

exports.createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).json({product})
})

exports.deleteProduct = asyncHandler(async(req,res) => {
    const productID = req.params.id
    
    if(!mongoose.Types.ObjectId.isValid(productID)){
        return res.status(404).json({message: `Product ${productID} not found`})
    }
    
    await Product.findOneAndDelete({_id: productID})
    res.status(200).send()
})

exports.updateProduct = asyncHandler(async(req,res) => {
    const productID = req.params.id

    if(!mongoose.Types.ObjectId.isValid(productID)){   
        return res.status(404).json({message: `Product ${productID} not found`})
    }

    let product = await Product.findOneAndUpdate({_id: productID}, req.body, {new: true})

    if(!product){
        return res.status(404).json({message: `Product ${productID} not found`})
    }

    res.status(201).json(product)
})