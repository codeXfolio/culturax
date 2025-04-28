import { Router } from 'express';
import { RequestHandler } from 'express';
import UserController from '../modules/user/user.controller';

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

router.post('/register', registerHandler);
router.get('/:address', getUserHandler);
router.post('/follow', followHandler);

export default router;
