import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export const Tags = mongoose.model('Tags', tagsSchema)