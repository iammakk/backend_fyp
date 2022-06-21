import Joi, { ObjectSchema } from "joi";
import { IUser } from "../interfaces/User";


const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

class AuthValidator {
  static register(data: IUser) {
    const schema = Joi.object<IUser>({
      firstName: Joi.string().trim().min(3).required(),
      lastName: Joi.string().trim().min(3).required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(data, options);
  }
  static login(data: IUser) {
    const schema = Joi.object<IUser>({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(data, options);
  }
}

export default AuthValidator;
