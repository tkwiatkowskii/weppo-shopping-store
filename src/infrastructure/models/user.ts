import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const User = sequelize.define(
  'User',
{
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: { isEmail: true }
  },
},
{
  timestamps: true,
  tableName: 'users'
});

export default User;
