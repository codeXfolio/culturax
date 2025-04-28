import { Router } from 'express';
import { RequestHandler } from 'express';
import multer, { memoryStorage } from 'multer';
import CollectionController from '../modules/collection/collection.controller';

const upload = multer({
  storage: memoryStorage(),
  dest: 'uploads/collections',
});
const collectionController = new CollectionController();
const router = Router();

const uploadHandler: RequestHandler = async (req, res) => {
  await collectionController.upload(req, res);
};

const getByUserHandler: RequestHandler = async (req, res) => {
  await collectionController.getByUser(req, res);
};

router.post('/upload', upload.single('images'), uploadHandler);
router.get('/user/:userId', getByUserHandler);

export default router;
