import path from "path";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { saveBase64Image } from "../utils/saveBase64Image";
import dotenv from "dotenv";
import { extractValueFromText } from "../utils/extractValueFromText";
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
    model: "gemini-1.5-pro",
  });

  const promptText =
    measureType === "WATER"
      ? "Identify if it is a water bill, if not, return a 'Essa não é uma conta de água'. Describe the water consumption value in this image. Search for the value above the text 'Consumo (m³)'"
      : "Identify if it is a gas bill, if not, return a string 'Essa não é uma conta de gás'. Describe the gas consumption value in this image.";

  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    { text: promptText },
  ]);

  const isTheCorrectBill = result.response.text();
  if (
    isTheCorrectBill == "Essa não é uma conta de água" ||
    "Essa não é uma conta de gás"
  ) {
    throw new Error("Tipo de conta inválida");
  }
  const measure = extractValueFromText(result.response.text());

  return { measure, fileUri };
};
