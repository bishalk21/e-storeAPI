import "dotenv/config";
import express from "express";

// we initialize our express router
const app = express();

// express.json for parsing json and getting data from the body or req.body
app.use(express.json());

// cors for cross-origin resource sharing and enabling access from different origins or our client can access our server
import cors from "cors";
app.use(cors());

// helmet to not send sensitive information in our response headers
import helmet from "helmet";
app.use(helmet());

const PORT = process.env.PORT || 8000;

// Api
import adminUserRouter from "./src/routers/adminUserRouter.js";
import {
  dbConnection
} from "./src/config/dbConfig.js";
import categoryRouter from "./src/routers/CategoryRouter.js";
import adminAuth from "./src/middlewares/auth-middleware/AuthMiddleware.js";
app.use("/api/v1/admin-user", adminUserRouter);
app.use("/api/v1/category", adminAuth, categoryRouter);



// Database Connection
dbConnection();

app.get("/", (req, res) => {
  res.json({
    message: "Hi there, you got lost in the API",
  });
});

app.use("/", (req, res, next) => {
  res.json({
    status: "name",
    message: "Route Not Found",
  });
})

// error handling middleware for any errors that may occur
app.use((error, req, res, next) => {
  console.log(error);
  // res.status(500).send("Something broke!");
  const statusCode = error.status || 404;
  res.status(statusCode).json({
    status: "error",
    message: "Something went wrong",
  });
});

// listen to port
app.listen(PORT, (error) => {
  // app.listen(PORT,) for listening to specific port
  // err && console.log(err);
  // console.log(`Server is listening on port http://localhost:${PORT}`);
  error ? console.log(error) : console.log(`Server is listening on port http://localhost:${PORT}`);
});