"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO = {
    url: "mongodb://localhost:27017",
};
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER = {
    port: SERVER_PORT,
};
const config = {
    mongo: MONGO,
    server: SERVER,
};
exports.default = config;
