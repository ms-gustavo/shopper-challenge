import sharp from "sharp";
import { CustomError } from "./CustomError";
import { validationsStrings } from "./errorsCode";

export const validateImageBuffer = async (base64Image: string) => {
  try {
    const imageBuffer = Buffer.from(base64Image, "base64");

    await sharp(imageBuffer).metadata();

    return imageBuffer;
  } catch (error: unknown) {
    throw new CustomError(validationsStrings.invalid_image, 400);
  }
};
