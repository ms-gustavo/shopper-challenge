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
    throw new Error(validationsStrings.invalid_image);
  }

  if (!customer_code || typeof customer_code !== "string") {
    throw new Error(validationsStrings.invalid_client_code);
  }

  if (!measure_datetime || !isValidDateTime(measure_datetime)) {
    throw new Error(validationsStrings.invalid_date);
  }

  if (!measure_type || !isValidMeasureType(measure_type)) {
    throw new Error(validationsStrings.invalid_measure_type);
  }

  return body;
};

export const validadeConfirmRequest = (body: any) => {
  const { measure_uuid, confirmed_value } = body;

  if (!measure_uuid || typeof measure_uuid !== "string") {
    throw new Error(validationsStrings.invalid_uuid);
  }

  if (!confirmed_value || typeof confirmed_value !== "number") {
    throw new Error(validationsStrings.invalid_confirmed_value);
  }

  return body;
};

export const validadeGetRequest = (params: any) => {
  const { customer_code } = params;
  isValidCustomerCode(customer_code);
  return params;
};
