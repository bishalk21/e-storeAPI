import mongoose from "mongoose";

const dbConnection = () => {
    try {
        const conStr = process.env.MONGO_CLIENT;
        if (!conStr) {
            return console.log("No MONGO_CLIENT found in environment variables");
        }
        const con = mongoose.connect(conStr);
        con && console.log("Connected to MongoDB");

    } catch (err) {
        console.log(err);
    }
}

export default dbConnection;