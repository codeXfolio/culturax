import { Request, Response } from 'express';
import {
  createSubscription,
  getSubscriptions,
  setMonetizationSettings,
  getMonetizationSettings,
  editMonetizationSettings,
  MonetizationSettingsInput,
} from './subscription.service';

class SubscriptionController {
  async create(req: Request, res: Response) {
    try {
      const { subscriberId, creatorId } = req.body;

      if (!subscriberId || !creatorId) {
        return res.status(400).json({
          success: false,
          error: 'Subscriber ID and creator ID are required',
        });
      }

      const subscription = await createSubscription({
        subscriberId,
        creatorId,
      });

      return res.status(201).json({
        success: true,
        data: subscription,
      });
    } catch (error) {
      console.error('Error creating subscription:', error);
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

  async getSubscriptions(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      const subscriptions = await getSubscriptions(userId);

      return res.status(200).json({
        success: true,
        data: subscriptions,
      });
    } catch (error) {
      console.error('Error getting subscriptions:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  async setMonetizationSettings(req: Request, res: Response) {
    try {
      const { userId, price, description, perks, payoutSchedule } = req.body;

      if (!userId || !price) {
        return res.status(400).json({
          success: false,
          error: 'User ID and price are required',
        });
      }

      const settings = await setMonetizationSettings({
        userId,
        price,
        description,
        perks,
        payoutSchedule,
      });

      return res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      console.error('Error setting monetization settings:', error);
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

  async editMonetizationSettings(req: Request, res: Response) {
    try {
      const { userId, price, description, perks, payoutSchedule } = req.body;

      if (!userId || !price) {
        return res.status(400).json({
          success: false,
          error: 'User ID and price are required',
        });
      }

      const settings = await editMonetizationSettings({
        userId,
        price,
        description,
        perks,
        payoutSchedule,
      });

      return res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      console.error('Error editing monetization settings:', error);
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

  async getMonetizationSettings(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      const settings = await getMonetizationSettings(userId);

      if (!settings) {
        return res.status(404).json({
          success: false,
          error: 'Monetization settings not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      console.error('Error getting monetization settings:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }
}

export default SubscriptionController;
