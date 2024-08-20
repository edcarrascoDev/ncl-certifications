export const handleImageUpload = async (imageFile: File): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const base64Image = reader.result.split(",")[1];
        resolve(base64Image);
      } else {
        reject(new Error("Error al leer la imagen"));
      }
    };
    reader.onerror = reject;
  });
};
