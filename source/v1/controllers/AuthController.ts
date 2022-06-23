import AppError from "../utils/AppError";
import AppResponse from "../utils/AppResponse";
import { NextFunction, Request, Response } from "express";
import tryCatch from "../middlewares/GlobalTryCatch";
import User from "../models/User";
import AuthValidator from "../validators/AuthValidator";
import UserRepository from "../repositories/interfaces/UserRepository";
import { HashService } from "../shared/services/hash.service";
import { generateToken } from "../shared/services/generateToken";

class AuthController {
  private readonly userRepository: UserRepository;
  //   private readonly authValidator: AuthValidator;

  constructor() {
    this.userRepository = new UserRepository();
    // this.authValidator = new AuthValidator();
  }

  login = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    
res.send("done")
    // const validationResult = AuthValidator.login(req.body);

    // if (validationResult.error) {
    //   let validatonError = validationResult.error.details[0].message;
    //   return next(new AppError(validatonError, 400));
    // }

    // const checkUser = await this.userRepository.findByEmail(
    //   validationResult.value.email
    // );

    // if (!checkUser) {
    //   return next(new AppError("User with this Email does not exists", 404));
    // }

    // if (
    //   checkUser &&
    //   !(await HashService.check(
    //     validationResult.value.password as string,
    //     checkUser.password as string
    //   ))
    // ) {
    //   return next(new AppError("Invalid credentials", 400));
    // }
    // const token = generateToken(checkUser);
    // return AppResponse.success(
    //   res,
    //   { user: checkUser, token: token },
    //   "Success",
    //   200
    // );
  });

  register = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      
      const validationResult = AuthValidator.register(req.body);

      if (validationResult.error) {
        let validatonError = validationResult.error.details[0].message;
        console.log(validatonError);

        return next(new AppError(validatonError, 400));
      }

      const exisitingUser = await this.userRepository.findByEmail(
        validationResult.value.email
      );

      if (exisitingUser) {
        return next(new AppError("User with this Email already exists", 400));
      }

      const newUser = await this.userRepository.create(validationResult.value);

      const token = generateToken(newUser);

      return AppResponse.success(
        res,
        { user: newUser, token: token },
        "User has been created",
        201
      );
    }
  );
}

export default AuthController;
