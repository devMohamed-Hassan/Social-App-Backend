import { Router } from "express";
import userRouter from "./modules/user/user.controller";
import authRouter from "./modules/auth/auth.controller";

const routers = Router();

routers.use("/auth", authRouter);
routers.use("/user", userRouter);

export default routers;
