import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json()); //
import cors from "cors";
app.use(cors());
import helmet from "helmet";
app.use(helmet());

const PORT = process.env.PORT || 8000;

// Api
import adminUserRouter from "./src/routers/adminUserRouter.js";
import { dbConnection } from "./src/config/dbConfig.js";
app.use("/api/v1/admin-user", adminUserRouter);

// Database Connection
dbConnection();

app.use("/", (req, res) => {
  res.json({
    message: "Welcome to the Admin User API",
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  // res.status(500).send("Something broke!");
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: "Something went wrong",
  });
});

app.listen(PORT, (err) => {
  // app.listen(PORT,) for listening to specific port
  err && console.log(err);
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
