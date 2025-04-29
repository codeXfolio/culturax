import { Router } from 'express';
import { RequestHandler } from 'express';
import multer, { memoryStorage } from 'multer';
import FeedController from '../modules/feed/feed.controller';

const upload = multer({
  storage: memoryStorage(),
  dest: 'uploads/feed',
});

const router = Router();
const feedController = new FeedController();

const createHandler: RequestHandler = async (req, res) => {
  await feedController.create(req, res);
};

const deleteHandler: RequestHandler = async (req, res) => {
  await feedController.delete(req, res);
};

router.post('/create', upload.single('image'), createHandler);
router.delete('/:id', deleteHandler);

export default router;
