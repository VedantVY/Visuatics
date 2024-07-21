import { Router } from "express"
import { query,param,body, validationResult} from 'express-validator'
import ContactModel from "../models/contact.js"
const ContactRouter = Router()
ContactRouter.post("/", async (req,res) => {
    try{
        console.log("Body: ")
        console.log(req.body)
        const contact = await ContactModel.create(req.body)
        if(contact) res.status(200).send(contact)
    }catch(error){
        console.log(error)
    }
})
export default ContactRouter