import { Request, Response } from 'express';
import {
  uploadCollection,
  getCollectionsByUser,
  CollectionInput,
} from './collection.service';

class CollectionController {
  async upload(req: Request, res: Response) {
    try {
      const { title, description, tags, userId } = req.body;
      const images = req.file;

      if (!title || !description || !tags || !userId) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
        });
      }

      const input: CollectionInput = {
        title,
        description,
        tags,
        userId,
      };

      if (!images) {
        throw new Error('No image file provided');
      }

      const collection = await uploadCollection(input, images);
      res.json({ success: true, data: collection });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(400).json({ success: false, error: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, error: 'Internal server error' });
      }
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      const collections = await getCollectionsByUser(userId);
      res.json({ success: true, data: collections });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, error: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, error: 'Internal server error' });
      }
    }
  }
}

export default CollectionController;
