import { RequestHandler, Router } from 'express';
import AiController from '../modules/ai/ai.controller';

const router = Router();

const aiController = new AiController();

const generateCaptionHandler: RequestHandler = async (req, res) => {
  await aiController.generateCaption(req, res);
};

router.post('/generate-caption', generateCaptionHandler);

export default router;
