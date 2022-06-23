import dotenv from "dotenv";

dotenv.config();
const MONGO = {
  url: "mongodb+srv://afru:afruzam1@fp.rxsfimi.mongodb.net/?retryWrites=true&w=majority",
};

const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
  port: SERVER_PORT,
};
const config = {
  mongo: MONGO,
  server: SERVER,
};
export default config;
