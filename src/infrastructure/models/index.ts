import sequelize from '../config/config.js';
import User from './user.js';
import Product from './product.js';
import CartItem from './cartItem.js';

User.hasMany(CartItem, { foreignKey: 'userId' });
CartItem.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

export { sequelize, User, Product, CartItem };
