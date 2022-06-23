import AuthController from "../controllers/AuthController";
import express from "express";

const router = express.Router();
const authController = new AuthController();

router.post("/login", authController.login as any);
router.post("/register", authController.register as any);

export default router;
