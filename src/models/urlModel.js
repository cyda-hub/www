import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  destination: {
    required: true,
    type: String,
    },
  id: {
    required: true,
    type: String
    },
  pwd:  {
    type: String
    },
  date:  {
    type: String
    },
});

const URL = mongoose.model("URL", urlSchema);

export default URL;
