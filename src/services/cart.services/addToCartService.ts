import { Request, Response } from 'express';
import { Product, CartItem, Order } from '../../infrastructure/models/index.js';
import type { SessionData } from 'express-session';
import { Result } from '../../types/result.js';

export default async function addToCartService(
  req: Request,
  _res: Response
): Promise<Result<[number, number, number]>> {
  const session = req.session as SessionData & { userId?: number };
  const userId = session.userId;

  const productIdParam = req.query['productId'];
  const addQuantityParam = req.query['addQuantity'];

  let result: Result<[number, number, number]>;
  if (typeof productIdParam !== 'string') {
    result = {
      success: false,
      reason: 'Invalid productId'
    }
    return result;
  }

  const productId = Number(productIdParam);
  if (Number.isNaN(productId)) {
    result = {
      success: false,
      reason: 'Invalid productId'
    }
    return result;
  }

  let addQuantity = 1;
  if (typeof addQuantityParam === 'string') {
    const parsed = Number(addQuantityParam);
    if (!Number.isNaN(parsed) && parsed > 0) {
      addQuantity = parsed;
    }
  }

  const product = await Product.findByPk(productId);
  if (!product) {
    result = {
      reason: 'Product not found',
      success: false
    }
    return result;
  }

  const [order] = await Order.findOrCreate({
    where: { userId, status: 'open' },
    defaults: { userId, status: 'open', total: 0 },
  }) as any;

  const cartItem = await CartItem.findOne({
    where: { userId, productId },
  }) as any;

  if (cartItem) {
    cartItem.quantity += addQuantity;
    await cartItem.save();
  } else {
    await CartItem.create({
      userId,
      productId,
      quantity: addQuantity,
    });
  }

  const cartItems = await CartItem.findAll({
    where: { userId },
    include: [Product],
  }) as any[];

  const newTotal = cartItems.reduce((sum, item) => {
    return sum + Number(item.Product.price) * item.quantity;
  }, 0);

  order.total = newTotal;
  await order.save();
  
  result = {
    success: true,
    value: [addQuantity, productId, newTotal]
  }
  return result;
}
