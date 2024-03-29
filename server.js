import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";

// DATABASE
import connectDb from "./src/config/dbConfig.js";
connectDb();

// MIDDLEWARES
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// PORT
const PORT = process.env.PORT || 8000;

// serving static content
// images
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
import adminUserRouter from "./src/routers/adminUserRouter.js";
import categoryRouter from "./src/routers/categoryRouter.js";
import { authAdmin } from "./src/middlewares/auth-middleware/authMiddleware.js";
import paymentMethodRouter from "./src/routers/paymentMethodRouter.js";
import productRouter from "./src/routers/productRouter.js";
import orderRouter from "./src/routers/orderRouter.js";
import reviewRouter from "./src/routers/reviewRouter.js";
import userRouter from "./src/routers/userRouter.js";

// Routes api
app.use("/api/v1/admin-user", adminUserRouter);
app.use("/api/v1/category", authAdmin, categoryRouter);
app.use("/api/v1/payment-method", authAdmin, paymentMethodRouter);
app.use("/api/v1/product", authAdmin, productRouter);
app.use("/api/v1/order", authAdmin, orderRouter);
app.use("/api/v1/reviews", authAdmin, reviewRouter);
app.use("/api/v1/users", authAdmin, userRouter);

// global ssr
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// GLOBAL ERROR
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 404;

  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running on port: http://localhost:${PORT}`);
});
