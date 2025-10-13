import fs from "fs";
import { S3Service } from "./../../services/s3.service";
import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../utils/sendSuccess";
import { AppError } from "../../utils/AppError";

export interface IUserServices {
  profileImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}

export class UserServices implements IUserServices {
  private s3Service: S3Service;

  constructor() {
    this.s3Service = new S3Service();
  }

  profileImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    console.log({ file: req.file });

    const userId = req.user?.id;

    if (!req.file) {
      throw new AppError("No image file uploaded", 400);
    }

    const imageUrl = await this.s3Service.uploadFile(
      req.file,
      `users/${userId}/profile-images`
    );

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });

    return sendSuccess({
      res,
      statusCode: 200,
      message: "Profile image uploaded successfully.",
      data: {
        imageUrl,
      },
    });
  };
}
