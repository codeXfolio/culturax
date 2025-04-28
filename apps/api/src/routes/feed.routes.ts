import { Router } from 'express';
import FeedController from '../modules/feed/feed.controller';

const router = Router();
const feedController = new FeedController();

export default router;