export const getActualMonth = async (measure_datetime: Date) => {
  const measureDate = new Date(measure_datetime);
  const monthStart = new Date(
    measureDate.getFullYear(),
    measureDate.getMonth(),
    1
  );
  const monthEnd = new Date(
    measureDate.getFullYear(),
    measureDate.getMonth() + 1,
    0
  );

  return { monthStart, monthEnd, measureDate };
};
