import { Router } from "express"
import bcrypt from 'bcrypt'
import UserModel from '../models/user.js'
import { query,param,body, validationResult} from 'express-validator'
import ProductModel from "../models/product.js"
import GenreModel from '../models/genre.js'
import multer from 'multer'
const storage = multer.diskStorage({
    destination(req,fil,callback){
        callback(null,"WallPapers");
    },
    filename(req,file,callback){
        callback(null, file.originalname )
    }
})
const upload = multer({ storage })
const ProductRouter = Router();
ProductRouter.post("/",body("Name").not().isEmpty().withMessage("The name can't be empty!").isString().withMessage("The name should not be a string"),body("Author").not().isEmpty().withMessage("The author can't be empty!").isString().withMessage("The author should be a string!"),body("Price").not().isEmpty().withMessage("The price can't be empty!").isDecimal().withMessage("The price must be a number!"),
body("GenreId").not().isEmpty().withMessage("The GenreId can't be empty!").isString().withMessage("The GenreId should be a string!"),body("Image").not().isEmpty().withMessage("The image can't be empty!"),
body("LikedBy").isArray().withMessage("The liked-by should be an array!"),body("Description").not().isEmpty().withMessage("The description can't be empty!").isString().withMessage("The description should not be a string"),upload.single("Image"), async (req,res) => {
    try{
        console.log(req.body)
        const user = await UserModel.find({User: req.body.Author })
        if(user.length != 1){
            res.status(404).json({ error: "No such user exists! "})
        }
        else{
            let genre = await GenreModel.find({Name: req.body.Genre })
            if(genre.length == 0){
                genre = await GenreModel.create({Name: req.body.Genre, IsRoot: true})
                genre = [genre]
            }
            const product = await ProductModel.create({...req.body, Image: req.file.filename, Author: user[0]._id, GenreId: genre[0]._id})
            if(product) res.status(200).json(product)
        }
    }catch(error){
        if(error.errorResponse)
            res.status(404).json({ error: "The author already has a wallpaper with the same name!"})
        else if(error.errors["LikedBy.0"])
            res.status(403).json({ error: "No such user exists for liking the wallpaper!"})
        else if(error.errors["GenreId"])
            res.status(403).json({ error: "No such Genre exists!" })
        else res.status(500).json(error.errors)
    }
})
ProductRouter.get("/",query("id").not().isEmpty().withMessage("The id is required!").isMongoId().withMessage("The id is incorrect!"),async (req,res) => {
    try{
        console.log(req.query.id)
        const product = await ProductModel.find({ _id: req.query.id})
        console.log(product)
        if(product.length == 1){
            res.status(200).json(product[0])
        }
        else{
            res.status(401).json({ error: "No such product exists!"})
        }
    }catch(error){
        res.status(500).json(error)
    }
})
ProductRouter.put("/:id",param("id").not().isEmpty().withMessage("The id is required!").isMongoId().withMessage("The id is invalid!"), async (req,res,next) => {
    try{
        const product = await ProductModel.find({ _id: req.params.id })
        if(product.length === 1) next()
        else res.status(404).send("No such user exists!")
    }catch(error){
        res.status(500).send(error)
    }
},body("Name").not().isEmpty().withMessage("The name can't be empty!").isString().withMessage("The name should not be a string"),body("Author").not().isEmpty().withMessage("The author can't be empty!").isString().withMessage("The author should be a string!"),body("Price").not().isEmpty().withMessage("The price can't be empty!").isDecimal().withMessage("The price must be a number!"),
body("GenreId").not().isEmpty().withMessage("The GenreId can't be empty!").isString().withMessage("The GenreId should be a string!"),body("Image").not().isEmpty().withMessage("The image can't be empty!").isString().withMessage("The image should be a string!"),
body("LikedBy").isArray().withMessage("The liked-by should be an array!"),async (req,res) => {
    try{
        const product = await ProductModel.findByIdAndUpdate(req.params.id,{ _id: req.params.id, ...req.body })
        res.status(200).json(product)
    }catch(error){
        if(error.errorResponse)
            res.status(404).json({ error: "The author already has a wallpaper with the same name!"})
        else if(error.errors["LikedBy.0"])
            res.status(403).json({ error: "No such user exists for liking the wallpaper!"})
        else if(error.errors["GenreId"])
            res.status(403).json({ error: "No such Genre exists!" })
        else res.status(500).json(error.errors)
    }
})
ProductRouter.get("/Likes",query("UserId").not().isEmpty().withMessage("The user id is required!").isMongoId().withMessage("The id is invalid!"),async (req,res) => {
    try{
        console.log(req.query.UserId)
        let products = await ProductModel.find({})
        products = products.filter((product) => {
            return(product.LikedBy.includes(req.query.UserId))
        })
        res.status(200).send(products)
    }catch(error){
        res.status(500).json(error)
    }
})
ProductRouter.get("/Authored",query("UserId").not().isEmpty().withMessage("The user id is required!").isMongoId().withMessage("The id is invalid!"),async (req,res) => {
    try{
        console.log(req.query.UserId)
        let products = await ProductModel.find({Author: req.query.UserId})
        res.status(200).send(products)
    }catch(error){
        if(error.path === "Author") res.status(404).json({error: "No such user exists!"})
        else res.status(500).json(error)
    }
})
ProductRouter.get("/UpdateLike",query("ProductId").not().isEmpty().withMessage("The product id is required!").isMongoId().withMessage("The product id is invalid!"),query("UserId").not().isEmpty().withMessage("The user id is required!").isMongoId().withMessage("The user id is invalid!") 
,async (req,res) => {
    try{
        const product = await ProductModel.find({ _id: req.query.ProductId })
        if(product.length == 1){
        if(req.query.Like === 'true' && !product[0].LikedBy.includes(req.query.UserId)) product[0].LikedBy.push(req.query.UserId) 
        else if(req.query.Like === 'false' && product[0].LikedBy.includes(req.query.UserId)) product[0].LikedBy.pop(req.query.UserId)
        const prod = await ProductModel.findByIdAndUpdate(req.query.ProductId,product[0])
        if(prod) res.status(200).send(prod)
        else res.status(401).json({error: "Unbeknownest!"})
    }
    }catch(error){
        res.status(500).json(error)
    }
})
export default ProductRouter
ProductRouter.get("/Search",query("String").not().isEmpty().withMessage("The string should not be empty!").isString().withMessage("The string is invalid!"), async (req,res) => {
    try{
        let prod = []
        let gen = []
        const products = await ProductModel.find({})
        prod = prod.concat(products.filter((value,index) => {
            return(value.Name.toLowerCase().includes(req.query.String.toLowerCase(),0))
        }))
        const genres = await GenreModel.find({})
        gen = gen.concat(genres.filter((value,index) => {
            return(value.Name.toLowerCase().includes(req.query.String.toLowerCase(),0))
        }))
        res.status(200).send({ Products: prod, Genres: gen })
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})
ProductRouter.get("/SearchProduct",query("String").not().isEmpty().withMessage("The string should not be empty!").isString().withMessage("The string is invalid!"), async (req,res) => {
    try{
        const genre = await GenreModel.find({ Name: req.query.String })
        if(genre.length == 1) {
            const products = await ProductModel.find().or([{ Name: req.query.String } , { GenreId: genre[0]._id }])
            res.status(200).send(products)
        }
        else{
            const products = await ProductModel.find({ Name: req.query.String })
            res.status(200).send(products)
        }
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})
ProductRouter.get("/SearchAllProduct", async (req,res) => {
    try{
        const products = await ProductModel.find({})
        res.status(200).send(products)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})
/*

*/