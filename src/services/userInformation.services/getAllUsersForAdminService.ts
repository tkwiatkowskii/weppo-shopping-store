import { User } from '../../infrastructure/models/index.js';
import { AdminUserListItemDto } from '../../models/userInformation.models/AdminUserListItem.js';

export default async function getAllUsersForAdminService()
  : Promise<AdminUserListItemDto[]> {
  const users = await User.findAll({
    attributes: ['username', 'email'],
    order: [['username', 'ASC']],
  }) as any;

  return users.map(user => ({
    username: user.username,
    email: user.email,
  }));
}
