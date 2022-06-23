
import jwt from "jsonwebtoken";
export const generateToken = (user :any) => {
  const token = jwt.sign({ _id: user._id }, "mahsecret", {
    expiresIn: "7d",
  });
  return token;
};
