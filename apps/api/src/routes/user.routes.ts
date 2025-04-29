import { Router } from 'express';
import { RequestHandler } from 'express';
import multer, { memoryStorage } from 'multer';
import UserController from '../modules/user/user.controller';

const upload = multer({
  storage: memoryStorage(),
  dest: 'uploads/avatars',
});

const userController = new UserController();
const router = Router();

const registerHandler: RequestHandler = async (req, res) => {
  await userController.register(req, res);
};

const getUserHandler: RequestHandler = async (req, res) => {
  await userController.getUser(req, res);
};

const followHandler: RequestHandler = async (req, res) => {
  await userController.follow(req, res);
};

const updateHandler: RequestHandler = async (req, res) => {
  await userController.update(req, res);
};

const getFollowersHandler: RequestHandler = async (req, res) => {
  await userController.getFollowers(req, res);
};

const getFollowingHandler: RequestHandler = async (req, res) => {
  await userController.getFollowing(req, res);
};

const updateCoverImageHandler: RequestHandler = async (req, res) => {
  await userController.updateCoverImage(req, res);
};

router.post('/register', upload.single('avatar'), registerHandler);
router.get('/:address', getUserHandler);
router.post('/follow', followHandler);
router.patch('/:address', updateHandler);
router.get('/:userId/followers', getFollowersHandler);
router.get('/:userId/following', getFollowingHandler);
router.patch(
  '/:userId/cover',
  upload.single('coverImage'),
  updateCoverImageHandler,
);

export default router;
