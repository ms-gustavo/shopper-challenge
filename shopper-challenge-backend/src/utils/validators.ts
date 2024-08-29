import { CustomError } from "./CustomError";
import { validationsStrings } from "./errorsCode";

export const isValidBase64 = (base64: string): boolean => {
  try {
    if (base64 === "" || base64.trim() === "") return false;

    const isBase64 =
      /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    return isBase64.test(base64);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return false;
  }
};

export const isValidDateTime = (dateTimeString: string): boolean => {
  const dateTime = new Date(dateTimeString);
  return !isNaN(dateTime.getTime());
};

export const isValidMeasureType = (measureType: string): boolean => {
  const validTypes = ["WATER", "GAS"];
  return validTypes.includes(measureType);
};

export const isValidCustomerCode = (customer_code: string): boolean => {
  if (!customer_code || typeof customer_code !== "string") {
    throw new CustomError(validationsStrings.invalid_client_code, 400);
  }
  return false;
};
