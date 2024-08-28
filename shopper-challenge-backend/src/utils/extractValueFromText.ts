export const extractValueFromText = (text: string): number | null => {
  const match = text.match(/is\s*([\d,\.]+)/);

  if (match) {
    const valueString = match[1].replace(",", ".");
    const value = parseFloat(valueString);
    return isNaN(value) ? null : value;
  }

  return null;
};
