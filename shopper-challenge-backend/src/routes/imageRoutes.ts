import { Router } from "express";
import { uploadImage } from "../controllers/uploadController";
import { confirmMeasurement } from "../controllers/confirmController";
const router = Router();

router.post("/upload", uploadImage);
router.patch("/confirm", confirmMeasurement);
export default router;
