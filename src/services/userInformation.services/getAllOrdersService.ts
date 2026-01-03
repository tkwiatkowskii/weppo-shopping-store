import { Order, OrderItem, Product, User } from '../../infrastructure/models/index.js';

export default async function getAllOrdersForAdminService() {
  const orders = await Order.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'email'],
      },
      {
        model: OrderItem,
        include: [
          {
            model: Product,
            attributes: ['id', 'name', 'category'],
          },
        ],
      },
    ],
    order: [['createdAt', 'DESC']],
  }) as any[];

  return orders.map(order => ({
    orderId: order.id,
    status: order.status,
    total: order.total,
    createdAt: order.createdAt,
    user: {
      id: order.User.id,
      username: order.User.username,
      email: order.User.email,
    },
    items: order.OrderItems.map((item: any) => ({
      productId: item.productId,
      name: item.Product.name,
      category: item.Product.category,
      price: Number(item.price),
      quantity: item.quantity,
      lineTotal: Number(item.price) * item.quantity,
    })),
  }));
}
