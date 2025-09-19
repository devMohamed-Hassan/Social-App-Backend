import express from "express";
import routers from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";

const app = express();

export const bootstrap = () => {
  app.use(express.json());

  connectDB();

  app.use("/api/v1", routers);
  app.use(errorHandler);

  app.get("/", (req, res, next) => {
    res.json({
      message: "Welcome to the Social App",
    });
  });

  app.listen(ENV.PORT, () => {
    console.log(`Server running on http://localhost:${ENV.PORT}`);
  });
};
