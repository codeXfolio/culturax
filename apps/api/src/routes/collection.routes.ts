import { Router } from 'express';
import CollectionController from '../modules/collection/collection.controller';

const router = Router();
const collectionController = new CollectionController();

export default router;