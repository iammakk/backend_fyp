import { IUser } from "../../interfaces/User";

export interface IUserRepository {
  create(payload: IUser): Promise<IUser>;
  findByEmail(email: IUser["email"]): Promise<IUser | null>;
}
