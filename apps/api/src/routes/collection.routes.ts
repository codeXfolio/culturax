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

const getByIdHandler: RequestHandler = async (req, res) => {
  await collectionController.getById(req, res);
};

const updateHandler: RequestHandler = async (req, res) => {
  await collectionController.update(req, res);
};

const deleteHandler: RequestHandler = async (req, res) => {
  await collectionController.delete(req, res);
};

router.post('/upload', upload.single('images'), uploadHandler);
router.get('/user/:userId', getByUserHandler);
router.get('/:id', getByIdHandler);
router.put('/update/:id', updateHandler);
router.delete('/delete/:id', deleteHandler);

export default router;
