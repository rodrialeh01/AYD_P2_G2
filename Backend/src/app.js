import express from "express";
import morgan from "morgan";
import cors from "cors";
import { API_PORT } from "./config/credentials.js";
import { connect } from "./db/dbConnection.js";
import responseMiddleware from "./middlewares/response.js";
import testHandler from "./routes/test.routes.js";
import authHandler from "./routes/auth.routes.js";
import userHandler from "./routes/user.routes.js";
import error404Handler from "./routes/404.routes.js";
import bookHandler from "./routes/book.routes.js";
import commentHandler from "./routes/comment.routes.js";
import historyHandler from "./routes/history.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(responseMiddleware);

connect(); 

app.use(testHandler);
app.use("/auth", authHandler);
app.use("/user", userHandler);
app.use("/book", bookHandler);
app.use("/comment", commentHandler);
app.use("/history", historyHandler);
app.use(error404Handler);

export default app;