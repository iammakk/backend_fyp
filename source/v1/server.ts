import http from "http";
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/v1Routes";
import mongoose from "mongoose";
import AppError from "./utils/AppError";
import AppErrorHandler from "./middlewares/AppErrorHandler";
import config from "./config/config";
import dotenv from "dotenv";
import cors from "cors";
const router = express();
dotenv.config();

mongoose
  .connect(config.mongo.url)
  .then((result) => {
    console.log("Mongo Connected");
  })
  .catch((error) => {
    console.log(error.message, error);
  });
router.use(express.json());
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});
router.use(cors());

router.use("/api/v1", routes);

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Api Route Not Found", 404));
});

router.use(AppErrorHandler);

const httpServer = http.createServer(router);

const running_server = httpServer.listen(config.server.port, () =>
  console.log(`Server is running on : ${config.server.port}`)
);
