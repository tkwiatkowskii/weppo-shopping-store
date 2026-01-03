import type { Request, Response } from 'express';
import { CartItem } from '../../infrastructure/models/index.js';
import type { SessionData } from 'express-session';
import { Result } from '../../types/result.js';

export default async function reduceCartItemQuantityService(
  req: Request,
  _res: Response
): Promise<Result<number>> {
  const session = req.session as SessionData & { userId?: number; roles?: string[] };
  const userId = session.userId;

  let result: Result<number>;

  const productIdParam = req.query['productId'];
  const removeQuantityParam = req.query['removeQuantity'];

  if (typeof productIdParam !== 'string' || typeof removeQuantityParam !== 'string') {
    result = {
      reason: 'Invalid query parameters',
      success: false
    }
    return result;
  }

  const productId = Number(productIdParam);
  const removeQuantity = Number(removeQuantityParam);

  if (Number.isNaN(productId) || Number.isNaN(removeQuantity) || removeQuantity <= 0) {
    result = {
      reason: 'Invalid productId or productQuantity',
      success: false
    }
    return result;
  }

  const cartItem = await CartItem.findOne({
    where: { userId, productId }
  }) as (InstanceType<typeof CartItem> & { quantity: number }) | null;

  if (!cartItem) {
    result = {
      reason: 'Product not in cart',
      success: false
    }
    return result;
  }

  const newQuantity = cartItem.quantity - removeQuantity;

  if (newQuantity > 0) {
    cartItem.quantity = newQuantity;
    await cartItem.save();
    result = {
      value: cartItem.quantity,
      success: true
    }
    return result;
  } else {
    await cartItem.destroy();
    result = {
      value: cartItem.quantity,
      success: true
    }
    return result;
  }
}
