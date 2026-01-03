import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Order = sequelize.define(
  'Order',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'placed',
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
  },
  {
    tableName: 'orders',
  }
);

export default Order;
