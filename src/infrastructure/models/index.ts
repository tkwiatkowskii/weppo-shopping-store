import sequelize from '../config/config.js';
import User from './user.js';
import Product from './product.js';
import CartItem from './cartItem.js';
import Role from './role.js';
import UserRole from './userRole.js';
import Password from './password.js';

User.hasMany(CartItem, { foreignKey: 'userId' });
CartItem.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

User.hasOne(Password, { foreignKey: 'userId' });
Password.belongsTo(User, { foreignKey: 'userId' });

export { 
  sequelize, 
  User, 
  Product, 
  CartItem,
  Password,
  UserRole,
  Role
};
