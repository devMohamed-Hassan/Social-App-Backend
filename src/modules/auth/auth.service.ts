import { NextFunction, Request, Response } from "express";

interface IAuthServices {
  signup(req: Request, res: Response, next: NextFunction): Response;
}

export class AuthServices implements IAuthServices {
  constructor() {}

  signup(req: Request, res: Response, next: NextFunction): Response {
    const { firstName, lastName, email, age, password } = req.body;

    return res.json({ msg: "Done" });
  }
}
