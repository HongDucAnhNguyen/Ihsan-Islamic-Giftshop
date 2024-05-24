import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const handleUploadAvatar = async (fileStream, folder) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
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
  // const result = await cloudinary.v2.uploader.upload(file, {
  //   resource_type: "auto",
  //   folder: folder,
  // });
  // return {
  //   public_id: result.public_id,
  //   url: result.url,
  // };
};

// export const uploads = (file, folder) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.v2.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           public_id: result.public_id,
//           url: result.url,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// };
