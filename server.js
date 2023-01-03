import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

// DATABASE
import connectDb from "./src/config/dbConfig.js";
connectDb();

// MIDDLEWARES
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json())

// PORT
const PORT = process.env.PORT || 8000;

// ROUTES
import adminUserRouter from "./src/routers/adminUserRouter.js";

// Routes api
app.use("/api/v1/admin-user", adminUserRouter);

// global ssr
app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    })
})

// GLOBAL ERROR
app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.status || 404;

    res.status(statusCode).json({
        status : "error",
        message : error.message,
    })
})

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server running on port: http://localhost:${PORT}`);
})