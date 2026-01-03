import { Router } from 'express';
import isAdminMiddleware from '../middleware/isAdminMiddleware.js';
import getAllUsersForAdminService from '../services/userInformation.services/getAllUsersForAdminService.js';
import getAllOrdersForAdminService from '../services/userInformation.services/getAllOrdersService.js';

const router = Router();

router.get('/users', isAdminMiddleware, async (_req, res, next) => {
  try {
    const users = await getAllUsersForAdminService();
    res.status(200).json({
      users: users
    });
  } catch (err) {
    next(err);
  }
});

router.get('/orders', isAdminMiddleware, async (req, res, next) => {
  try {
    const { status } = req.query;
    const orders = await getAllOrdersForAdminService(status);
    res.status(200).json({
      orders: orders
    });
  } catch (err) {
    next(err);
  }
});

export default router;
