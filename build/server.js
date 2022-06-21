"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const v1Routes_1 = __importDefault(require("./routes/v1Routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("./utils/AppError"));
const AppErrorHandler_1 = __importDefault(require("./middlewares/AppErrorHandler"));
const config_1 = __importDefault(require("./config/config"));
const router = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.default.mongo.url)
    .then((result) => {
    console.log("Mongo Connected");
})
    .catch((error) => {
    console.log(error.message, error);
});
router.use(express_1.default.json());
router.use("/api/v1", v1Routes_1.default);
router.all("*", (req, res, next) => {
    next(new AppError_1.default("Api Route Not Found", 404));
});
router.use(AppErrorHandler_1.default);
const httpServer = http_1.default.createServer(router);
const running_server = httpServer.listen(config_1.default.server.port, () => console.log(`Server is running on : ${config_1.default.server.port}`));
