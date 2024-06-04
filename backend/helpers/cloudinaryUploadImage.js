import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const handleUploadAvatar = async (fileStream, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        (error, result) => {
          if (error) {
            // console.error("Error uploading to Cloudinary:", error);
            reject(error);
          } else {
            return resolve({
              public_id: result.public_id,
              url: result.url,
            });
          }
        }
      )
      .end(fileStream);
  });
};
