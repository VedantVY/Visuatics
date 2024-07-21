import mongoose from 'mongoose'
const GenreModel = mongoose.model("Genre",new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    IsRoot: {
        type: Boolean,
        required: true,
        default: false
    },
    ChildId: {
        type: [ mongoose.Schema.Types.ObjectId ],
        default: []
    }
},{
    timestamps: true
}))
export default GenreModel