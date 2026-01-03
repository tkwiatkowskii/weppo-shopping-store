import crypto from 'crypto';
import { User, Password, Role } from '../models/index.js';

export default async function seedAdmin() {
  const email = 'admin@admin.com';
  const username = 'admin';
  const plainPassword = 'admin';

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    console.log('Admin user already exists');
    return;
  }

  const user = await User.create({
    username,
    email,
  }) as any;

  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 10000;

  const hashedPassword = crypto
    .pbkdf2Sync(plainPassword, salt, iterations, 64, 'sha512')
    .toString('hex');

  await Password.create({
    userId: user.id,
    hashedPassword,
    salt,
    iterations,
  });

  const [adminRole] = await Role.findOrCreate({
    where: { roleName: 'admin' },
    defaults: { roleName: 'admin' },
  });

  await (user as any).addRole(adminRole);

  console.log('Admin user created');
}
