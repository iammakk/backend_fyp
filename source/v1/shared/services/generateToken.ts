
import jwt from "jsonwebtoken";
export const generateToken = (user :any) => {
  const token = jwt.sign({ _id: user._id }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: "7d",
  });
  return token;
};
