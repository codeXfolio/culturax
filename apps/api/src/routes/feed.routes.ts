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

const createCommentHandler: RequestHandler = async (req, res) => {
  await feedController.createComment(req, res);
};

const deleteCommentHandler: RequestHandler = async (req, res) => {
  await feedController.deleteComment(req, res);
};

const likeHandler: RequestHandler = async (req, res) => {
  await feedController.like(req, res);
};

const unlikeHandler: RequestHandler = async (req, res) => {
  await feedController.unlike(req, res);
};

const getLikesHandler: RequestHandler = async (req, res) => {
  await feedController.getLikes(req, res);
};

const getCommentsHandler: RequestHandler = async (req, res) => {
  await feedController.getComments(req, res);
};

router.post('/create', upload.single('image'), createHandler);
router.delete('/:id', deleteHandler);
router.post('/comment', createCommentHandler);
router.delete('/comment/:id', deleteCommentHandler);
router.post('/like', likeHandler);
router.post('/unlike', unlikeHandler);
router.get('/:feedPostId/likes', getLikesHandler);
router.get('/:feedPostId/comments', getCommentsHandler);

export default router;
