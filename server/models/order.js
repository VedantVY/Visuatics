import mongoose from 'mongoose'
const OrderModel = mongoose.model("Order",(new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    Price: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})).index({ UserId: 1, ProductId: 1}, { unique: true }))
export default OrderModel