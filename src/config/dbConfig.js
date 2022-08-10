import mongoose from "mongoose";

export const dbConnection = () => {
    try {
        const conStr = process.env.MONGO_CLIENT;
        console.log(conStr);
        if (!conStr) {
            return console.log("No connection string found");
        }
        const con = mongoose.connect(conStr);
        con && console.log("Connected to MongoDB");

    } catch (err) {
        console.log(err);
    }

}