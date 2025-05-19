import { Request, Response } from 'express';
import {
  uploadCollection,
  getCollectionsByUser,
  CollectionInput,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getCollectionsByUsername,
} from './collection.service';

class CollectionController {
  async upload(req: Request, res: Response) {
    try {
      const { title, description, tags, userId } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const images = files['images']?.[0];
      const coverImage = files['coverImage']?.[0];

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

      const collection = await uploadCollection(input, images, coverImage);
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

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Collection ID is required',
        });
      }

      await deleteCollection(id);
      return res.status(200).json({
        success: true,
        message: 'Collection deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting collection:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to delete collection',
      });
    }
  }

  async getByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;

      if (!username) {
        return res.status(400).json({
          success: false,
          error: 'Username is required',
        });
      }

      const collections = await getCollectionsByUsername(username);
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
