import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const OrderItem = sequelize.define(
  'OrderItem',
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'order_items',
  }
);

export default OrderItem;
