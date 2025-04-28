import multer from 'multer';
import path from 'path';

export const collectionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/collections');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});
