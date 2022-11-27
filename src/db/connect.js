
import mongoose from "mongoose";
export const connectToDB = () => {
    mongoose.connect(process.env.MONGO_DB_URI, (err) => {
        if (err) {
            console.log(err);
        }
    
        console.log("Database connected successfully");
    });
}
