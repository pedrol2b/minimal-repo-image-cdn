import {
  PutObjectCommand,
  S3Client,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";
import * as dotenv from "dotenv";
import { extname } from "path";
import sharp from "sharp";

dotenv.config();

export default class ContentDeliveryNetwork extends S3Client {
  private s3: S3Client;

  /** Resize buffer */
  public static resize = false;
  public static resizeWidth = 300;
  public static resizeHeight = 300;

  public static SUBPATH = "images/";

  public static MIMETYPES = ["image/jpeg", "image/png", "image/jpg"];

  private static readonly credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };

  public static REGION = process.env.AWS_REGION;
  public static DOMAIN = process.env.AWS_CLOUDFRONT_DOMAIN;
  public static BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

  constructor() {
    super();

    if (!ContentDeliveryNetwork.REGION) {
      throw new Error("ContentDeliveryNetwork.REGION is not defined");
    }

    if (!ContentDeliveryNetwork.DOMAIN) {
      throw new Error("ContentDeliveryNetwork.DOMAIN is not defined");
    }

    if (!ContentDeliveryNetwork.BUCKET_NAME) {
      throw new Error("ContentDeliveryNetwork.BUCKET_NAME is not defined");
    }

    this.s3 = new S3Client({
      region: ContentDeliveryNetwork.REGION,
      credentials: ContentDeliveryNetwork.credentials,
    });
  }

  private getAwsCloudfrontUrl = (key: string) => {
    return encodeURI(`https://${ContentDeliveryNetwork.DOMAIN}/${key}`);
  };

  protected async putObject(params: Omit<PutObjectCommandInput, "Bucket">) {
    const commandInput: PutObjectCommandInput = {
      Bucket: ContentDeliveryNetwork.BUCKET_NAME,
      ...params,
    };

    return this.s3.send(new PutObjectCommand(commandInput));
  }

  public async putImageFile(file: Express.Multer.File) {
    const mimeTypes = ContentDeliveryNetwork.MIMETYPES;
    if (!mimeTypes.includes(file.mimetype)) {
      throw new Error("File mimeType is not allowed");
    }

    let buffer = file.buffer;
    if (ContentDeliveryNetwork.resize) {
      buffer = await sharp(buffer)
        .resize(
          ContentDeliveryNetwork.resizeWidth,
          ContentDeliveryNetwork.resizeHeight,
        )
        .toBuffer();
    }

    const path = `${ContentDeliveryNetwork.SUBPATH}`;

    const fileExt = extname(file.originalname);
    const fileName = `${randomBytes(16).toString("hex")}${fileExt}`; // ? generate a random file name

    const Key = `${path}${fileName}`; // * prepend the subpath to the key

    await this.putObject({
      Key,
      Body: buffer,
      ContentType: file.mimetype,
    });

    return this.getAwsCloudfrontUrl(Key);
  }
}
