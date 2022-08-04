import express from "express"
const app = express();

app.use(express.json()); // 

import cors from "cors";
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/", (req, res) => { // app.use("/" for listening to all requests)
    res.send("Hello World");
})

app.use((err, req, res, next) => {
    console.log(err);
    // res.status(500).send("Something broke!");
    const status = err.statusCode || 404;
    res.status(status).json({
        status: "error",
        message: err.message
    })
})

app.listen(PORT, (err) => { // app.listen(PORT,) for listening to specific port
    err && console.log(err);
    console.log(`Server is listening on port http://localhost:${PORT}`);
})