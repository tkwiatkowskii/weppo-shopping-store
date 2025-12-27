import sequelize from '../config/config.js';

const UserRole = sequelize.define('UserRole', {}, {
  tableName: 'user_roles',
  timestamps: false
});

export default UserRole;
