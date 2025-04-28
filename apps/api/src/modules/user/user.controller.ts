import { Request, Response } from 'express';
import { getUserByAddress, inputUser, RegisterUserInput } from './user.service';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const input = req.body as unknown as RegisterUserInput;

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
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ success: false, error: 'Invalid input data' });
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
}

export default UserController;
