import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    ProfilePicture: {
        type: String,
        required: true
    },
    User: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});
const UserModel = mongoose.model("User",UserSchema)
export default UserModel