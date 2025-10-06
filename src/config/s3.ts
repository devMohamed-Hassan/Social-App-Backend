import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { ENV } from "./env";

export const s3 = new S3Client({
  region: ENV.AWS_REGION,
  credentials: {
    accessKeyId: ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
  },
});

(async () => {
  try {
    const data = await s3.send(new ListBucketsCommand({}));
    console.log("[S3] Connected successfully", data.Buckets);
  } catch (err) {
    console.error("[S3] Connection failed:", err);
  }
})();
