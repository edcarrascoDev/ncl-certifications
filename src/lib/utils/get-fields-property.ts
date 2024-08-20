import formidable from "formidable";

export const getFieldsProperty = (fields: formidable.Fields) => {
  const convertedFields: Record<string, any> = {};

  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      if (key.startsWith("is")) {
        convertedFields[key] = Array.isArray(fields[key])
          ? fields[key][0] === "true"
          : fields[key] === "true";
      } else {
        convertedFields[key] = Array.isArray(fields[key])
          ? fields[key][0]
          : fields[key];
      }
    }
  }
  return convertedFields;
};
