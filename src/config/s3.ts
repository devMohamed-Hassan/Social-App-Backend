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
    const bucket = data.Buckets?.[0];

    if (bucket?.Name) {
      console.log(
        `S3 connected successfully → [Region: ${ENV.AWS_REGION} | Bucket: ${bucket.Name}]`
      );
    }
  } catch (err) {
    console.error(
      `Failed to connect to S3 → [Region: ${ENV.AWS_REGION} | Error: ${
        (err as Error).message
      }]`
    );
  }
})();
