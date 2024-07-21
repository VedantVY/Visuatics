import { Router } from "express"
import fs from 'fs'
import bcrypt from 'bcrypt'
import { query,param,body, validationResult} from 'express-validator'
import multer from 'multer'
import UserModel from "../models/user.js"
const storage = multer.diskStorage({
    destination(req,fil,callback){
        callback(null,"ProfilePictures");
    },
    filename(req,file,callback){
        callback(null, file.originalname )
    }
})
const upload = multer({ storage })
const UserRouter = Router()
UserRouter.post("/",body("FullName").not().isEmpty().withMessage("The fullname can't be empty!")
.isString().withMessage("The fullname should be a string"),body("User").not().isEmpty().withMessage("The username can't be empty!").isString().withMessage("The username should be a string!"), 
upload.single("ProfilePicture"),
 async (req,res,next) =>{
    const user = await UserModel.exists({User: req.body.User}).then(result => result)
    if(user !== null) res.status(400).json({ error: "The username already exists! "})
    else next()
},body("Email").not().isEmpty().withMessage("The email can't be empty!").isEmail().withMessage("The given email is incorrect!")
,body("Password").not().isEmpty().withMessage("The password can't be empty!").isString().withMessage("The password must be a string!")
,async (req,res) => {
    try{
        console.log(req.body)
        const User = new UserModel({...req.body, ProfilePicture: req.file.filename})
        const salt = await bcrypt.genSalt(10)
        User.Password = await bcrypt.hash(req.body.Password,salt)
        const user = await User.save()
        console.log(user)
        res.status(200).json({...user,error: validationResult(req)})
    }catch(error){
        res.status(500).json({ error: error })
        console.log(error)
    }
})
UserRouter.get("/Login",query("User").not().isEmpty().withMessage("The username can't be empty!").isString().withMessage("The username should be a string!"),
query("Password").not().isEmpty().withMessage("The password can't be empty!").isString().withMessage("The password should be a string!"), async (req,res)=>{
    try{
        const user = await UserModel.findOne({User: req.query.User});
        if(user){
            const result = await bcrypt.compare(req.query.Password, user.Password)
            if(result) res.status(200).json(user);
            else res.status(403).json({ error: "The password is invalid!" });
        } 
        else res.status(404).json({error: "The username is incorrect!" })
    }catch(err){
        console.log("Err: "+err)
    }
})
UserRouter.put("/:id",param("id").not().isEmpty().withMessage("The id can't be empty!").isString().withMessage("The id is invalid!"), async (req,res,next)=>{
    try{
        const user = await UserModel.exists({ _id: req.params.id });
        if(user) next()
        else res.status(404).json({ error: "The user doesn't exists!" })
    }catch(err){
        console.log("Err: "+err)
    }
},body("FullName").not().isEmpty().withMessage("The fullname can't be empty!")
.isString().withMessage("The fullname should be a string"),body("User").not().isEmpty().withMessage("The username can't be empty!").isString().withMessage("The username should be a string!"),body("Email").not().isEmpty().withMessage("The email can't be empty!").isEmail().withMessage("The given email is incorrect!")
,body("Password").not().isEmpty().withMessage("The password can't be empty!").isString().withMessage("The password must be a string!")
,async (req,res,next) => {
    try{
        const Olduser = await UserModel.findById(req.params.id)
        fs.unlinkSync("ProfilePictures/"+Olduser.ProfilePicture)
        next()
    }catch(error){
        console.log(error)
    }
},upload.single("ProfilePicture"),async (req,res) => {
    try{
        console.log(req.body)
        const salt = await bcrypt.genSalt(10)
        const HashedPassword = await bcrypt.hash(req.body.Password,salt)
        const user = await UserModel.findByIdAndUpdate(req.params.id,{ ...req.body, Password: HashedPassword })
        res.status(200).json(user)
    }catch(error){
        res.status(500).send("Query Failed!: "+error)
    }
})
UserRouter.get("/",query("id").not().isEmpty().withMessage("The user id is required!").isMongoId().withMessage("The user id is invalid!"),async (req,res) => {
    try{
        const user = await UserModel.find({_id: req.query.id})
        if(user.length == 1) res.status(200).send(user[0])
        else res.status(403).json({ error: "No such user exists!"})
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})
export default UserRouter;