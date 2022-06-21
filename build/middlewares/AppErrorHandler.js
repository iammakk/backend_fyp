"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const AppResponse_1 = __importDefault(require("../utils/AppResponse"));
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message = `Duplicate Field Value: ${value}. Please use another value`;
    return new AppError_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    // console.log("error", err.errors);
    const errors = "Object.values.apply(err.errors).map(el=>el.message);";
    // for (const [key, value] of Object.entries(err.errors)) {
    // 	console.log(`${key[properties]}`);
    // }
    const message = err;
    return new AppError_1.default(message, 422);
};
const handleJWTExpiredError = (err) => new AppError_1.default("login season has been expired, login again", 401);
const handleJWTError = (err) => new AppError_1.default("Unathorized", 401);
const AppErrorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    if (err.name === "CastError") {
        err = handleCastErrorDB(err);
    }
    if (err.code === 11000) {
        err = handleDuplicateFieldsDB(err);
    }
    if (err.name === "ValidationError") {
        err = handleValidationErrorDB(err);
    }
    if (err.name === "JsonWebTokenError")
        err = handleJWTError(err);
    if (err.name === "TokenExpiredError")
        err = handleJWTExpiredError(err);
    AppResponse_1.default.error(err, res);
};
exports.default = AppErrorHandler;
