import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const CartItem = sequelize.define(
  'CartItem',
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    tableName: 'cart_items',
  }
);

export default CartItem;
