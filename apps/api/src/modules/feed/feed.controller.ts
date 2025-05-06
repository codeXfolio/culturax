import { Request, Response } from 'express';
import {
  createFeedPost,
  deleteFeedPost,
  CreateFeedPostInput,
  createComment,
  deleteComment,
  likePost,
  unlikePost,
  getPostLikes,
  getPostComments,
  getFeedPosts,
  GetFeedPostsInput,
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

  async createComment(req: Request, res: Response) {
    try {
      const { userId, feedPostId, comment } = req.body;

      if (!userId || !feedPostId || !comment) {
        return res.status(400).json({
          success: false,
          error: 'User ID, post ID, and comment are required',
        });
      }

      const newComment = await createComment({ userId, feedPostId, comment });
      return res.status(201).json({
        success: true,
        data: newComment,
      });
    } catch (error) {
      console.error('Error creating comment:', error);
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

  async deleteComment(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Comment ID is required',
        });
      }

      await deleteComment(id);
      return res.status(200).json({
        success: true,
        message: 'Comment deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
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

  async like(req: Request, res: Response) {
    try {
      const { userId, feedPostId } = req.body;

      if (!userId || !feedPostId) {
        return res.status(400).json({
          success: false,
          error: 'User ID and post ID are required',
        });
      }

      const like = await likePost(userId, feedPostId);
      return res.status(201).json({
        success: true,
        data: like,
      });
    } catch (error) {
      console.error('Error liking post:', error);
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

  async unlike(req: Request, res: Response) {
    try {
      const { userId, feedPostId } = req.body;

      if (!userId || !feedPostId) {
        return res.status(400).json({
          success: false,
          error: 'User ID and post ID are required',
        });
      }

      await unlikePost(userId, feedPostId);
      return res.status(200).json({
        success: true,
        message: 'Post unliked successfully',
      });
    } catch (error) {
      console.error('Error unliking post:', error);
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

  async getLikes(req: Request, res: Response) {
    try {
      const { feedPostId } = req.params;

      if (!feedPostId) {
        return res.status(400).json({
          success: false,
          error: 'Post ID is required',
        });
      }

      const likes = await getPostLikes(feedPostId);
      return res.status(200).json({
        success: true,
        data: likes,
      });
    } catch (error) {
      console.error('Error getting likes:', error);
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

  async getComments(req: Request, res: Response) {
    try {
      const { feedPostId } = req.params;

      if (!feedPostId) {
        return res.status(400).json({
          success: false,
          error: 'Post ID is required',
        });
      }

      const comments = await getPostComments(feedPostId);
      return res.status(200).json({
        success: true,
        data: comments,
      });
    } catch (error) {
      console.error('Error getting comments:', error);
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

  async getAll(req: Request, res: Response) {
    try {
      const { page, username } = req.query;
      const input: GetFeedPostsInput = {
        page: page ? parseInt(page as string) : undefined,
        limit: 9,
        username: username as string,
      };

      const result = await getFeedPosts(input);
      return res.status(200).json({
        success: true,
        data: result.posts,
        pagination: result.pagination,
      });
    } catch (error) {
      console.error('Error getting feed posts:', error);
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
