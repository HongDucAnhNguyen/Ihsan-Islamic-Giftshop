import multer from "multer";

//handling multi part formdata
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    //multer accept file ppass
    callback(null, true);
  }
  //multer reject file pass
  else
    callback(
      { error: "Unsupported file format, please upload a valid file" },
      false
    );
};

//returns file upload object
const multerUpload = multer({
  storage,
  limits: { fieldSize: 1024 * 1024 },
  fileFilter,
});

export default multerUpload;
