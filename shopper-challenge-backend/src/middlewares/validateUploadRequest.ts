import { CustomError } from "../utils/CustomError";
import { validationsStrings } from "../utils/errorsCode";
import {
  isValidBase64,
  isValidDateTime,
  isValidMeasureType,
  isValidCustomerCode,
} from "../utils/validators";

export const validateUploadRequest = (body: any) => {
  const { image, customer_code, measure_datetime, measure_type } = body;

  if (!image || !isValidBase64(image)) {
    throw new CustomError(validationsStrings.invalid_image, 400);
  }

  if (!customer_code || typeof customer_code !== "string") {
    throw new CustomError(validationsStrings.invalid_client_code, 400);
  }

  if (!measure_datetime || !isValidDateTime(measure_datetime)) {
    throw new CustomError(validationsStrings.invalid_date, 400);
  }

  if (!measure_type || !isValidMeasureType(measure_type)) {
    throw new CustomError(validationsStrings.invalid_measure_type, 400);
  }

  return body;
};

export const validadeConfirmRequest = (body: any) => {
  const { measure_uuid, confirmed_value } = body;

  if (!measure_uuid || typeof measure_uuid !== "string") {
    throw new CustomError(validationsStrings.invalid_uuid, 400);
  }

  if (!confirmed_value || typeof confirmed_value !== "number") {
    throw new CustomError(validationsStrings.invalid_confirmed_value, 400);
  }

  return body;
};

export const validadeGetRequest = (params: any) => {
  const { customer_code } = params;
  isValidCustomerCode(customer_code);
  return params;
};
