import { Request, Response } from 'express';
import {
  uploadCollection,
  getCollectionsByUser,
  CollectionInput,
  getCollectionById,
  updateCollection,
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

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Collection ID is required',
        });
      }

      const collection = await getCollectionById(id);
      res.json({ success: true, data: collection });
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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, tags, coverImage } = req.body;

      const updatedCollection = await updateCollection(id, {
        title,
        description,
        tags,
        coverImage,
      });

      return res.status(200).json({
        success: true,
        data: updatedCollection,
      });
    } catch (error) {
      console.error('Error updating collection:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update collection',
      });
    }
  }
}

export default CollectionController;
