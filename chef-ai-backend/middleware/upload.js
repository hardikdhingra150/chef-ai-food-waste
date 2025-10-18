const multer = require('multer');
const path = require('path');
const constants = require('../config/constants');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (constants.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG and PNG allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: constants.MAX_FILE_SIZE },
  fileFilter
});

module.exports = upload;
