"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const hash_service_1 = require("../../shared/services/hash.service");
class UserRepository {
    constructor() {
        this.create = (payload) => __awaiter(this, void 0, void 0, function* () {
            let newUser = yield User_1.default.create(payload);
            newUser.password = yield hash_service_1.HashService.hashPassword(newUser.password);
            return (yield newUser.save());
        });
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ email: email });
        });
    }
}
exports.default = UserRepository;