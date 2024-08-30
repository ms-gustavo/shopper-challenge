import { Request, Response } from "express";
import { validateUploadRequest } from "../middlewares/validateUploadRequest";
import { processImageWithGemini } from "../services/uploadService";
import { v4 as uuidv4 } from "uuid";
import Measurement from "../models/Measurement";
import { getActualMonth } from "../utils/getActualMonth";
import { doubleReport, invalidData } from "../utils/errorsCode";
import { CustomError } from "../utils/CustomError";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } =
      validateUploadRequest(req.body);
    const { monthStart, monthEnd, measureDate } = await getActualMonth(
      measure_datetime
    );

    const existingMeasurement = await Measurement.findOne({
      customer_code,
      measure_type,
      measure_datetime: {
        $gte: monthStart,
        $lte: monthEnd,
      },
    });

    if (existingMeasurement) {
      return res.status(409).json({
        error_code: doubleReport.error_code,
        error_description: doubleReport.error_description,
      });
    }

    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const guid = uuidv4();
    const { measure, fileUri } = await processImageWithGemini(
      base64Data,
      measure_type
    );
    const newMeasurement = new Measurement({
      customer_code,
      measure_datetime: measureDate,
      measure_type,
      measure_value: measure,
      measure_uuid: guid,
      image_url: fileUri,
    });
    await newMeasurement.save();

    return res.status(200).json({
      measure_value: measure,
      measure_uuid: guid,
      image_url: fileUri,
    });
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      console.log(error);
      return res.status(error.statusCode).json({
        error_code: error.statusCode,
        error_description: error.message,
      });
    }

    if (
      error instanceof Error &&
      error.message.includes("GoogleGenerativeAI Error")
    ) {
      console.log(error.message);
      return res.status(500).json({
        error_code: 500,
        error_description:
          "Erro interno na API do Google Generative AI. Por favor, tente novamente mais tarde.",
      });
    }

    res.status(500).json({
      error_code: invalidData.error_code,
      error_description: "Erro ao processar a solicitação",
    });
    console.log((error as Error).message as string);
  }
};
