import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connect } from "./db/dbConnection.js";
import responseMiddleware from "./middlewares/response.js";
import testHandler from "./routes/test.routes.js";
import authHandler from "./routes/auth.routes.js";
import userHandler from "./routes/user.routes.js";
import error404Handler from "./routes/404.routes.js";
import petHandler from "./routes/pet.routes.js";
import reviewHandler from "./routes/review.routes.js";
import productHandler from "./routes/product.routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(responseMiddleware);

connect(); 

app.use(testHandler);
app.use("/product", productHandler);
app.use("/auth", authHandler);
app.use("/user", userHandler);
app.use("/pet", petHandler);
app.use("/review", reviewHandler);
app.use(error404Handler);

export default app;