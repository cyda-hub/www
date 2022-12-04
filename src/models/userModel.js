import mongoose from "mongoose";
import URL from "./urlModel.js";

const userModel = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true});

const user = mongoose.model("user", userModel);

export default user;
