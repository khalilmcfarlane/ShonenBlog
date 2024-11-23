import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3Config = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImagetoS3(file: File) {
  // Create Amazon S3 bucket config
  // Call this function in ImageUploader.tsx

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const bucketName = process.env.AWS_S3_BUCKET_NAME!;
  const key = `${randomUUID()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  });

  await s3Config.send(command);
  return `https://${bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;
}
