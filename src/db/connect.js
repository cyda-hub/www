
import mongoose from "mongoose";
export const connectToDB = () => {
    mongoose.connect(process.env.MONGODB_URI, (err) => {
        if (err) {
            console.log(err);
        }
    
        console.log("Database connected successfully");
    });
}
