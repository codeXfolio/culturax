import { Router } from 'express';
import CreatorController from '../modules/creator/creator.controller';

const router = Router();
const creatorController = new CreatorController();

router.get('/', creatorController.getCreators);

export default router;
