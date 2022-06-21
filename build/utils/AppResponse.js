"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppResponse {
    static error(err, res) {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || "error";
        if (process.env.NODE_ENV == "development") {
            res.status(err.statusCode).json({
                code: err.statusCode,
                message: err.message,
                data: null,
                stack_trace: err.stack,
                status: "Error",
            });
        }
        else {
            if (err.isOperational) {
                res.status(err.statusCode).json({
                    code: err.statusCode,
                    message: err.message,
                    data: null,
                    status: "Error",
                });
            }
            else {
                console.log(err);
                res.status(err.statusCode).json({
                    code: err.statusCode,
                    status: "Error",
                    message: "Something Went Wrong Try Again Later",
                    data: null,
                });
            }
        }
    }
    static success(res, data, message, code) {
        res.status(code).json({
            code: code,
            message: message,
            data: data,
            status: "Success",
        });
    }
}
exports.default = AppResponse;
