import { boolean } from "joi";
import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/User";

export const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  roles: {
    type: [String],
    default: ["student"],
  },
  status: {
    type: Boolean,
  },
});

export default mongoose.model<IUser>("user", UserSchema);
