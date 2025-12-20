import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const UserRoles = sequelize.define(
  'UserRoles',
{
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: 'user_roles',
});

export default UserRoles;