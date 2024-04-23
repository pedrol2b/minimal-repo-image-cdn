import { Router } from "express";

import { uploadImage } from "@/middlewares/uploadImage";

import ContentDeliveryNetwork from "@/services/ContentDeliveryNetwork";

const contentDeliveryNetwork = new ContentDeliveryNetwork();

const router = Router();

router.post("/upload", uploadImage.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).send({ error: "No file uploaded" });

  const imageUrl = await contentDeliveryNetwork.putImageFile(req.file);

  res.send({ imageUrl });
});

export default router;
