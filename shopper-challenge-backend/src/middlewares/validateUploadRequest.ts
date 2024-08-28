import {
  isValidBase64,
  isValidDateTime,
  isValidMeasureType,
} from "../utils/validators";

export const validateUploadRequest = (body: any) => {
  const { image, customer_code, measure_datetime, measure_type } = body;

  if (!image || !isValidBase64(image)) {
    throw new Error("Imagem inválida");
  }

  if (!customer_code || typeof customer_code !== "string") {
    throw new Error("Código do cliente inválido");
  }

  if (!measure_datetime || !isValidDateTime(measure_datetime)) {
    throw new Error("Data inválida");
  }

  if (!measure_type || !isValidMeasureType(measure_type)) {
    throw new Error("Tipo de medida inválido");
  }

  return body;
};

export const validadeConfirmRequest = (body: any) => {
  const { measure_uuid, confirmed_value } = body;

  if (!measure_uuid || typeof measure_uuid !== "string") {
    throw new Error("UUID inválido");
  }

  if (!confirmed_value || typeof confirmed_value !== "number") {
    throw new Error("Valor confirmado inválido");
  }

  return body;
};
