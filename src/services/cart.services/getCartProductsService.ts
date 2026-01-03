import { Request } from "express";
import { Product, CartItem } from "../../infrastructure/models/index.js";
import { SessionData } from "express-session";

export default async function getCartProductsService(
  req: Request,
) {
  const session = req.session as SessionData & { userId?: number; roles?: string[] };
  const userId = session.userId;

  const items = await CartItem.findAll({
    where: { userId },
    include: [Product],
  }) as (InstanceType<typeof CartItem> & { Product: typeof Product })[];

  return items;
}