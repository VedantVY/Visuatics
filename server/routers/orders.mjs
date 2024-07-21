import { Router } from "express"
import bcrypt from 'bcrypt'
import { query,param,body, validationResult} from 'express-validator'
import OrderModel from "../models/order.js"
const OrderRouter = Router()
OrderRouter.post("/user",body("UserId").not().isEmpty().withMessage("The user id is required!").isMongoId().withMessage("The user id is invalid!")
,async (req,res) => {
    try{
        const orders = await OrderModel.find({UserId: req.body.UserId})
        res.status(200).send(orders)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})
OrderRouter.post("/",body("UserId").not().isEmpty().withMessage("The user id is required!").isMongoId().withMessage("The user id is invalid!"),body("PrdouctId").not().isEmpty().withMessage("The product id is required!").isMongoId().withMessage("The product id is invalid!"),async (req,res) => {
    try{
        console.log(req.body)
        const order = await OrderModel.create(req.body)
        if(order) res.status(200).send(order)
    }catch(error){
        console.log(error)
        if(error.errorResponse) res.status(403).json({ error: "The user has already made an order for this product!"})
        else if(error.errors.UserId) res.status(403).json({ error: "No such user exists!"})
        else if(error.errors.ProductId) res.status(403).json({ error: "No such product exists!"})
        else res.status(500).json(error)
    }
})
OrderRouter.get("/",query("id").not().isEmpty("The order id is required!").isMongoId().withMessage("The order id is invalid!"),async (req,res) => {
    const order = await OrderModel.find({ _id: req.query.id })
    if(order.length === 1) res.status(200).json(order)
    else res.status(404).json({ error: "No such order was made!"})
})
OrderRouter.put("/",body("UserId").not().isEmpty().withMessage("The user id is required!").isMongoId().withMessage("The user id is invalid!"),body("PrdouctId").not().isEmpty().withMessage("The product id is required!").isMongoId().withMessage("The product id is invalid!"),async (req,res) => {
    try{
        const UserProduct = await OrderModel.findOne({ UserId: req.body.UserId, ProductId: req.body.ProductId })
        res.status(200).send(UserProduct)
    }catch(error){
        if(error.errors.UserId) res.status(403).json({ error: "No such user exists!"})
        else if(error.errors.ProductId) res.status(403).json({ error: "No such product exists!"})
        else res.status(500).json(error)
    }
})
OrderRouter.get("/Product",query("ProductId").not().isEmpty().withMessage("The product id is required!").isMongoId().withMessage("The product id is invalid!"),
async (req,res) => {
    try{
        const orders = await OrderModel.find({ ProductId: req.query.ProductId })
        res.status(200).send(orders)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})
export default OrderRouter