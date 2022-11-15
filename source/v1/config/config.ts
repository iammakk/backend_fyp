import dotenv from "dotenv";

dotenv.config();
const MONGO = {
  url: "mongodb+srv://adil:adil123@fypp.sbwexye.mongodb.net/test",
};

const SERVER_PORT = 1337;

const SERVER = {
  port: SERVER_PORT,
};
const config = {
  mongo: MONGO,
  server: SERVER,
};
export default config;
