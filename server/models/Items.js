import mongoose from "mongoose";
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    deletionComment: {
        type: String,
        required: false
    }
})

const Item = mongoose.model("item", ItemSchema);
export default Item