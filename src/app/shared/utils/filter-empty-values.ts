export const filterEmptyValues = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined && value !== "") {
      result[key as keyof T] = value;
    }
  }

  return result;
};
