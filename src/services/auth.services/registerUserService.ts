import crypto from 'crypto';
import type { Request } from 'express';
import { User, Password, Role } from '../../infrastructure/models/index.js';
import { Result } from '../../types/result.js';

export default async function registerUserService(
  username: string,
  password: string,
  email: string,
  req: Request
): Promise<Result> {
  const existing = await User.findOne({ where: { email } });

  if (existing) {
    const result: Result = {
      success: false,
      reason: "An account with this email already exists"
    }
    return result;
  }

  const user = await User.create({ username, email }) as InstanceType<typeof User> 
    & { id: number };

  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 10000;

  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, iterations, 64, 'sha512')
    .toString('hex');

  await Password.create({
    userId: user.id,
    hashedPassword,
    salt,
    iterations,
  });

  const role = await Role.findOne({ where: { roleName: 'user' } });
  await (user as any).addRole(role);

  req.session.userId = user.id;
  req.session.roles = ['user'];

  const result: Result = {
    success: true
  }
  return result;
}
