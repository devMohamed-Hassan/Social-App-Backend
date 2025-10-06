import { PutObjectCommand } from "@aws-sdk/client-s3";
import { StoreIn } from "./multer/multer.config";
import { createReadStream } from "fs";
import { AppError } from "../utils/AppError";
import { ENV } from "../config/env";
import { s3 } from "../config/s3";

export class S3Service {
  private static readonly bucketName = ENV.AWS_S3_BUCKET_NAME;
  private static readonly ACL = "private";

  static async uploadFile({
    path = "general",
    file,
    storeIn = StoreIn.MEMORY,
  }: {
    path: string;
    file: Express.Multer.File;
    storeIn: StoreIn;
  }): Promise<string> {
    if (!file) {
      throw new AppError("No file provided for upload", 400);
    }

    const key = `socialapp/${path}/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body:
        storeIn === StoreIn.MEMORY ? file.buffer : createReadStream(file.path),
      ContentType: file.mimetype,
      ACL: this.ACL,
    });

    await s3.send(command);

    return `https://${this.bucketName}.s3.${ENV.AWS_REGION}.amazonaws.com/${key}`;
  }
}
