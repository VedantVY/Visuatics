import { Router } from "express"
import bcrypt from 'bcrypt'
import { query,param,body, validationResult} from 'express-validator'
import GenreModel from "../models/genre.js"
const GenreRouter = Router()
GenreRouter.get("/", query("id").not().isEmpty().withMessage("THe genre id is reqiured!").isMongoId().withMessage("The genre id is invalid!"),async (req,res) => {
    try{
        console.log("GenreId: ")
        console.log(req.query.id)
        const genre = await GenreModel.find({_id: req.query.id})
        if(genre.length == 1) res.status(200).send(genre[0])
        else res.status(403).json({error: "No such genre exists!"})
    }catch(error){
        res.status(500).json(error)
    }
})
export default GenreRouter