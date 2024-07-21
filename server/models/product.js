import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    LikedBy: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'user',
        default: []
    },
    Price: {
        type: Number,
        required: true,
        default: 0
    },
    GenreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'genre'
    },
    Description: {
        type: String,
        required: true
    }
},{
    timestamps: true
})
ProductSchema.index(
    {
        Name: 1,
        Author: 1
    },
    {
        unique: true
    }
);
const ProductModel = mongoose.model("Product",ProductSchema)
export default ProductModel
