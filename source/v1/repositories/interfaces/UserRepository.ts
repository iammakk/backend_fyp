import { IUser } from "../../interfaces/User";
import User from "../../models/User";
import { HashService } from "../../shared/services/hash.service";
import { IUserRepository } from "./IUserRepository";

class UserRepository implements IUserRepository {
  constructor() {}

  create = async (payload: IUser): Promise<IUser> => {
    console.log({ payload });

    let newUser = await User.create(payload);
    newUser.password = await HashService.hashPassword(
      newUser.password as string
    );

    return newUser;
  };

  findByEmail = async (email: IUser["email"]): Promise<IUser | null> => {
    return await User.findOne({ email });
  };
}

export default UserRepository;
