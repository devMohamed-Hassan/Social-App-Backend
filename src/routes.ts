import { Router } from "express";
import userRouter from "./modules/user/user.controller";
import authRouter from "./modules/auth/auth.controller";
import postRouter from "./modules/post/post.controller";

const routers = Router();

routers.use("/auth", authRouter);
routers.use("/users", userRouter);
routers.use("/posts", postRouter);

export default routers;
