import ContentDeliveryNetwork from "@/services/ContentDeliveryNetwork";
import { type Request } from "express";
import multer, { type FileFilterCallback } from "multer";

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // * 5MB
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const mimeTypes = ContentDeliveryNetwork.MIMETYPES;
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File mimeType is not allowed"));
    }
  },
});

export { uploadImage };
