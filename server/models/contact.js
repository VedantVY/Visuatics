import mongoose from "mongoose"
const ContactSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});
const ContactModel = mongoose.model("Contact",ContactSchema)
export default ContactModel