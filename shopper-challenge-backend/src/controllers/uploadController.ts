import { Request, Response } from "express";
import { validateUploadRequest } from "../middlewares/validateUploadRequest";
import { processImageWithGemini } from "../services/uploadService";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } =
      validateUploadRequest(req.body);
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const guid = uuidv4();
    const { measure, fileUri } = await processImageWithGemini(
      base64Data,
      measure_type
    );
    res.json({
      message: "Image processed successfully",
      measure: `${measure} m³`,
      guid: guid,
      fileUri: fileUri,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      console.error(error);
    }
  }
};
