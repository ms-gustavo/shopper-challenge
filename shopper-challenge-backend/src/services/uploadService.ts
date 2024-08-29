import path from "path";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { saveBase64Image } from "../utils/saveBase64Image";
import dotenv from "dotenv";
import { extractValueFromText } from "../utils/extractValueFromText";
import { stringUtils } from "../utils/stringUtils";
import { invalidIaResponse } from "../utils/errorsCode";
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const processImageWithGemini = async (
  base64Image: string,
  measureType: "WATER" | "GAS"
) => {
  const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);
  const tempFilePath = path.join(
    __dirname,
    `../../uploads/image_${Date.now()}.jpg`
  );
  await saveBase64Image(base64Image, tempFilePath);
  const uploadResponse = await fileManager.uploadFile(tempFilePath, {
    mimeType: "image/jpeg",
    displayName: `image_${Date.now()}.jpg`,
  });
  await fileManager.getFile(uploadResponse.file.name);
  const fileUri = uploadResponse.file.uri;
  const model = genAI.getGenerativeModel({
    model: stringUtils.geminiModel,
  });

  const promptText =
    measureType === "WATER"
      ? stringUtils.waterPromptText
      : stringUtils.gasPromptText;
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    { text: promptText },
  ]);

  const measure = result.response.text();
  if (isNaN(Number(measure))) {
    throw new Error(invalidIaResponse.invalidIaResponse);
  }

  return { measure, fileUri };
};
