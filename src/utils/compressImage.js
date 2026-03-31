import imageCompression from "browser-image-compression";

export const compressImage = async (file) => {
  if (!(file instanceof File)) return file;

  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log("Compression error:", error);
    return file;
  }
};
