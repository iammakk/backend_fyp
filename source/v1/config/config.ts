import dotenv from "dotenv";

dotenv.config();
const MONGO = {
  url: "mongodb://localhost:27017",
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
