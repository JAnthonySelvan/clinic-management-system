import cloudinary from "../config/cloudinary.mjs";

// Default static image used when no upload happens or upload fails
export const DEFAULT_PROFILE_IMAGE =
  "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

export const uploadImageBuffer = (buffer, folder = "doctors") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );

    stream.end(buffer);
  });
};

export const uploadPdfBuffer = (buffer, filename = `prescription_${Date.now()}`) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "prescriptions",
        resource_type: "raw",
        public_id: filename,
        format: "pdf",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          pdfUrl: result.secure_url,
          cloudinaryPublicId: result.public_id,
        });
      },
    );

    stream.end(buffer);
  });
};
