import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Password = sequelize.define(
  'Password', 
{
  hashedPassword: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  salt: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  iterations: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1000,
    }
  },
},
{
  tableName: 'passwords'
})

export default Password;