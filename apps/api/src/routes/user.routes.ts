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

router.post('/register', registerHandler);
router.get('/:address', getUserHandler);

export default router;
