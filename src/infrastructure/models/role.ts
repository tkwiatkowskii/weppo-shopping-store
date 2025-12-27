import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Roles = sequelize.define(
  'Roles',
{
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: 'roles',
});

export default Roles;