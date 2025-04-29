import { Request, Response } from 'express';
import {
  createFeedPost,
  deleteFeedPost,
  CreateFeedPostInput,
} from './feed.service';

class FeedController {
  async create(req: Request, res: Response) {
    try {
      const input = req.body as CreateFeedPostInput;
      input.image = req.file;

      if (!input.userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      const post = await createFeedPost(input);
      return res.status(201).json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error('Error creating feed post:', error);
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Post ID is required',
        });
      }

      await deleteFeedPost(id);
      return res.status(200).json({
        success: true,
        message: 'Post deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting feed post:', error);
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }
}

export default FeedController;
