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
const AppError_1 = __importDefault(require("../utils/AppError"));
const AppResponse_1 = __importDefault(require("../utils/AppResponse"));
const GlobalTryCatch_1 = __importDefault(require("../middlewares/GlobalTryCatch"));
const AuthValidator_1 = __importDefault(require("../validators/AuthValidator"));
const UserRepository_1 = __importDefault(require("../repositories/interfaces/UserRepository"));
const hash_service_1 = require("../shared/services/hash.service");
class AuthController {
    //   private readonly authValidator: AuthValidator;
    constructor() {
        this.login = (0, GlobalTryCatch_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const validationResult = AuthValidator_1.default.login(req.body);
            if (validationResult.error) {
                let validatonError = validationResult.error.details[0].message;
                return next(new AppError_1.default(validatonError, 400));
            }
            const checkUser = yield this.userRepository.findByEmail(validationResult.value.email);
            if (!checkUser) {
                return next(new AppError_1.default("User with this Email does not exists", 404));
            }
            if (checkUser &&
                !(yield hash_service_1.HashService.check(validationResult.value.password, checkUser.password))) {
                return next(new AppError_1.default("Invalid credentials", 400));
            }
            return AppResponse_1.default.success(res, { user: checkUser }, "Success", 200);
        }));
        this.register = (0, GlobalTryCatch_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const validationResult = AuthValidator_1.default.register(req.body);
            if (validationResult.error) {
                let validatonError = validationResult.error.details[0].message;
                return next(new AppError_1.default(validatonError, 400));
            }
            const exisitingUser = yield this.userRepository.findByEmail(validationResult.value.email);
            if (exisitingUser) {
                return next(new AppError_1.default("User with this Phone already exists", 400));
            }
            const newUser = yield this.userRepository.create(validationResult.value);
            //   let token = await this.userRepository.generateAuthToken(
            //     newUser
            //   );
            return AppResponse_1.default.success(res, { user: newUser }, "User has been created", 201);
        }));
        this.userRepository = new UserRepository_1.default();
        // this.authValidator = new AuthValidator();
    }
}
exports.default = AuthController;
