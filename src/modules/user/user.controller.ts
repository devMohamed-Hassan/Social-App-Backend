import { Router } from "express";
import { UserServices } from "./user.service";

const userRouter = Router();
const userServices = new UserServices();

export default userRouter;
