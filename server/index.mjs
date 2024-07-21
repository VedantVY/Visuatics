import UserRouter from './routers/users.mjs'
import ProductRouter from './routers/products.mjs'
import OrderRouter from './routers/orders.mjs'
import GenreRouter from './routers/genres.mjs'
import ContactRouter from './routers/contacts.mjs'
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Stripe from 'stripe'
import path from 'path'
const stripe = new Stripe("sk_test_51PR3e4BkmXJVU6jdxo7s3Bu8Wl8BPOSC9R0Yb7poGehExfezUycwVZp013Roc3JxEfc1Wmc99RP8m3YJyiXPiUCi00bWKJ4lSx")
const app = express()
app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use("/ProfilePictures",express.static("ProfilePictures"))
app.use("/WallPapers",express.static("WallPapers"))
app.use("/api/users",UserRouter)
app.use("/api/products",ProductRouter)
app.use("/api/orders",OrderRouter)
app.use("/api/genres",GenreRouter)
app.use("/api/contacts",ContactRouter)
app.post("/payment", async (req,res) => {
    console.log("Works!")
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: req.body.Name
                    },
                    unit_amount: req.body.Amount*100
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: "http://localhost:5173/Payment?UserId="+req.body.UserId+"&ProductId="+req.body.ProductId+"&Price="+req.body.Amount,
        cancel_url: "http://localhost:5000/payment?"
    })
    res.status(200).send(session.id)
})
mongoose.connect("mongodb://localhost:27017/GameStop").then(
    ()=>{
        console.log("Connected to Database")
    }
).catch(() => { console.log("Failed to connect to the database!")})
app.listen(5000,()=>{ console.log("Listening to port 5000")})
app.get("/",(req,res)=>{
    res.status(200).json({ message: "Okay"})
    res.end()
})