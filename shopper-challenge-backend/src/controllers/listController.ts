import { Request, Response } from "express";
import Measurement from "../models/Measurement";
import { validadeGetRequest } from "../middlewares/validateUploadRequest";

export const listMeasurements = async (req: Request, res: Response) => {
  try {
    const { customer_code } = validadeGetRequest(req.params);
    const { measure_type, page = 1 } = req.query;

    if (
      measure_type &&
      !["WATER", "GAS"].includes(String(measure_type).toUpperCase())
    ) {
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida",
      });
    }

    const filter: any = { customer_code };

    if (measure_type) {
      filter.measure_type = String(measure_type).toUpperCase();
    }

    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    const [measures, total] = await Promise.all([
      Measurement.find(filter)
        .skip(skip)
        .limit(limit)
        .select(
          "measure_uuid measure_datetime measure_type confirmed image_url"
        ),
      Measurement.countDocuments(filter),
    ]);

    if (measures.length === 0) {
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada",
      });
    }

    console.log(measures[0]);
    res.status(200).json({
      customer_code,
      total,
      current_page: Number(page),
      measures: measures.map((measure) => ({
        measure_uuid: measure.measure_uuid,
        measure_datetime: measure.measure_datetime,
        measure_type: measure.measure_type,
        has_confirmed: measure.confirmed,
        image_url: measure.image_url,
      })),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        error_code: "SERVER_ERROR",
        error_description: "Erro ao processar a solicitação",
      });
    }
    console.log(error);
  }
};
