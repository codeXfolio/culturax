import { Router } from 'express';
import { RequestHandler } from 'express';
import SubscriptionController from '../modules/subscription/subscription.controller';

const router = Router();
const subscriptionController = new SubscriptionController();

const createHandler: RequestHandler = async (req, res) => {
  await subscriptionController.create(req, res);
};

const getSubscriptionsHandler: RequestHandler = async (req, res) => {
  await subscriptionController.getSubscriptions(req, res);
};

const setMonetizationSettingsHandler: RequestHandler = async (req, res) => {
  await subscriptionController.setMonetizationSettings(req, res);
};

const editMonetizationSettingsHandler: RequestHandler = async (req, res) => {
  await subscriptionController.editMonetizationSettings(req, res);
};

const getMonetizationSettingsHandler: RequestHandler = async (req, res) => {
  await subscriptionController.getMonetizationSettings(req, res);
};

router.post('/create', createHandler);
router.get('/user/:userId', getSubscriptionsHandler);
router.post('/monetization/settings', setMonetizationSettingsHandler);
router.put('/monetization/settings', editMonetizationSettingsHandler);
router.get('/monetization/settings/:userId', getMonetizationSettingsHandler);

export default router;
