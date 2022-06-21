"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const options = {
    errors: {
        wrap: {
            label: "",
        },
    },
};
class AuthValidator {
    static register(data) {
        const schema = joi_1.default.object({
            firstName: joi_1.default.string().trim().min(3).required(),
            lastName: joi_1.default.string().trim().min(3).required(),
            email: joi_1.default.string().trim().email().required(),
            password: joi_1.default.string().trim().min(6).required(),
        });
        return schema.validate(data, options);
    }
    static login(data) {
        const schema = joi_1.default.object({
            email: joi_1.default.string().trim().email().required(),
            password: joi_1.default.string().trim().min(6).required(),
        });
        return schema.validate(data, options);
    }
}
exports.default = AuthValidator;
