import type { Request } from 'express';
import { CartItem, Product, Order, OrderItem, sequelize } from '../../infrastructure/models/index.js';
import type { SessionData } from 'express-session';
import { Result } from '../../types/result.js';

export default async function placeOrderService(
  req: Request
): Promise<Result<number>> {
  const session = req.session as SessionData & { userId?: number };
  const userId = session.userId;

  const transaction = await sequelize.transaction();

  try {
    const order = await Order.findOne({
      where: { userId, status: 'open' },
      transaction,
    }) as any;

    if (!order) {
      await transaction.rollback();
      return { success: false, reason: 'No open order to place' };
    }

    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [Product],
      transaction,
    }) as any[];

    if (cartItems.length === 0) {
      await transaction.rollback();
      return { success: false, reason: 'Cart is empty' };
    }

    for (const item of cartItems) {
      if (item.Product.stock < item.quantity) {
        await transaction.rollback();
        return { success: false, reason: `Insufficient stock for product ${item.Product.name}` };
      }
    }

    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.Product.price) * item.quantity,
      0
    );

    order.status = 'placed';
    order.total = total;
    await order.save({ transaction });

    for (const item of cartItems) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.Product.id,
          quantity: item.quantity,
          price: item.Product.price,
        },
        { transaction }
      );

      item.Product.stock -= item.quantity;
      await item.Product.save({ transaction });
    }

    await CartItem.destroy({ where: { userId }, transaction });

    await transaction.commit();

    return { success: true, value: cartItems.length };
  } catch (err: any) {
    await transaction.rollback();
    return { success: false, reason: err.message || 'Failed to place order' };
  }
}
