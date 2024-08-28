import { Request, Response } from "express";
import Measurement from "../models/Measurement";
import { validadeConfirmRequest } from "../middlewares/validateUploadRequest";

export const confirmMeasurement = async (req: Request, res: Response) => {
  try {
    const { measure_uuid, confirmed_value } = validadeConfirmRequest(req.body);

    const existingMeasurement = await Measurement.findOne({ measure_uuid });
    if (!existingMeasurement) {
      return res.status(404).json({
        error_code: "MEASURE_NOT_FOUND",
        error_description: "Leitura do mês já realizada",
      });
    }

    if (existingMeasurement.confirmed) {
      return res.status(409).json({
        error_code: "CONFIRMATION_DUPLICATE",
        error_description: "Leitura do mês já realizada",
      });
    }

    if (existingMeasurement.measure_value === confirmed_value) {
      existingMeasurement.confirmed = true;
    } else {
      existingMeasurement.measure_value = confirmed_value;
      existingMeasurement.confirmed = false;
    }

    await existingMeasurement.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ error_code: "INVALID_DATA", error_description: error.message });
      console.error(error);
    }
  }
};
