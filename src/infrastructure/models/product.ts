import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Product = sequelize.define(
  'Product',
{
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  }
},
{
  tableName: 'products', 
}
);

export default Product;
