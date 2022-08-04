import express from "express"
const app = express();

app.use(express.json());

import cors from "cors";
app.use(cors());

const PORT = 8000;

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something broke!");
})

app.use("/", (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, (err) => {
    err && console.log(err);
    console.log(`Server is listening on port http://localhost:${PORT}`);
})