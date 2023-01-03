import mongoose from "mongoose";

const connectDb = () => {
    try {
        mongoose.set('strictQuery', false);
        const conStr = process.env.MONGO_CLIENT;

        if (!conStr) {
            console.log("MongoDB connection string is not defined");
            return;
        }

        const conn = mongoose.connect(conStr);
        conn && console.log("MongoDB connected");

    } catch (error) {
        console.log(error)
    }
}

export default connectDb;