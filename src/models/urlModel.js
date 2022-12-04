import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    destination: {
        required: true,
        type: String,
    },
    id: {
        required: true,
        type: String,
    },
    pwd: {
        type: String,
    },
    expireAt: {
        type: Date,
        index: {
          expireAfterSeconds: 60
        }
    },
    owner: {
        type: String // user ID
    }
}, {timestamps: true});

const URL = mongoose.model("URL", urlSchema);

export default URL;
