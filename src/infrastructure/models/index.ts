import sequelize from '../config/config.js';
import User from './user.js';
import Product from './product.js';
import CartItem from './cartItem.js';
import Role from './role.js';
import UserRole from './userRole.js';
import Password from './password.js';
import Order from './order.js';
import OrderItem from './orderItem.js';

User.hasMany(CartItem, { foreignKey: 'userId' });
CartItem.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

User.hasOne(Password, { foreignKey: 'userId' });
Password.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export { 
  sequelize, 
  User, 
  Product, 
  CartItem,
  Password,
  UserRole,
  Role,
  Order,
  OrderItem
};
