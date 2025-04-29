import { Request, Response } from 'express';
import {
  getUserByAddress,
  inputUser,
  RegisterUserInput,
  followUser,
  updateUser,
  UpdateUserInput,
  getFollowers,
  getFollowing,
  updateCoverImage,
} from './user.service';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const input = req.body as unknown as RegisterUserInput;
      input.avatar = req.file;

      //   Check if user already exists
      const user = await getUserByAddress(input.address);

      if (user) {
        return res
          .status(400)
          .json({ success: false, error: 'User already exists' });
      }

      if (input.accountType === 'ADMIN') {
        return res
          .status(403)
          .json({ success: false, error: 'Forbidden to create admin account' });
      }

      const newUser = await inputUser(input);
      res.json({ success: true, data: newUser });
    } catch (error) {
      console.error('Error in user registration:', error);
      if (error instanceof Error) {
        res.status(400).json({ success: false, error: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, error: 'Internal server error' });
      }
    }
  }

  async getUser(req: Request, res: Response) {
    const { address } = req.params;
    if (!address) {
      return res
        .status(400)
        .json({ success: false, error: 'Address is required' });
    }

    const user = await getUserByAddress(address);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json(user);
  }

  async follow(req: Request, res: Response) {
    try {
      const { userAddress, targetAddress } = req.body;

      if (!userAddress || !targetAddress) {
        return res.status(400).json({
          success: false,
          error: 'User and target addresses are required',
        });
      }

      const follow = await followUser(userAddress, targetAddress);
      res.json({ success: true, data: follow });
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
      const { address } = req.params;
      const input = req.body as UpdateUserInput;

      if (!address) {
        return res.status(400).json({
          success: false,
          error: 'Address is required',
        });
      }

      const user = await updateUser(address, input);
      res.json({ success: true, data: user });
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

  async getFollowers(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      const followers = await getFollowers(userId);

      return res.status(200).json({
        success: true,
        data: followers,
      });
    } catch (error) {
      console.error('Error getting followers:', error);
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

  async getFollowing(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      const following = await getFollowing(userId);

      return res.status(200).json({
        success: true,
        data: following,
      });
    } catch (error) {
      console.error('Error getting following:', error);
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

  async updateCoverImage(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const coverImage = req.file;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      if (!coverImage) {
        return res.status(400).json({
          success: false,
          error: 'Cover image is required',
        });
      }

      const updatedUser = await updateCoverImage(userId, coverImage);

      return res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      console.error('Error updating cover image:', error);
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

export default UserController;
