import { Request, Response } from "express";
import Measurement from "../models/Measurement";
import { validadeConfirmRequest } from "../middlewares/validateUploadRequest";
import {
  confirmationDuplicate,
  doubleReport,
  invalidData,
  measureNotFound,
} from "../utils/errorsCode";

export const confirmMeasurement = async (req: Request, res: Response) => {
  try {
    const { measure_uuid, confirmed_value } = validadeConfirmRequest(req.body);

    const existingMeasurement = await Measurement.findOne({ measure_uuid });
    if (!existingMeasurement) {
      return res.status(404).json({
        error_code: measureNotFound.error_code,
        error_description: doubleReport.error_description,
      });
    }

    if (existingMeasurement.confirmed) {
      return res.status(409).json({
        error_code: confirmationDuplicate.error_code,
        error_description: confirmationDuplicate.error_description,
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
        .json({
          error_code: invalidData.error_code,
          error_description: error.message,
        });
      console.error(error);
    }
  }
};
