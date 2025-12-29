import crypto from 'crypto';
import type { Request } from 'express';
import { User, Password, Role } from '../../infrastructure/models/index.js';
import { Result } from '../../types/result.js';

export default async function loginUserService(
  email: string,
  password: string,
  req: Request
): Promise<Result> {

  const user = await User.findOne({
    where: { email },
    include: [Password, Role],
  }) as any;

  if (!user || !user.Password) {
    const result: Result = {
      success: false,
      reason: "Account doesn't exist"
    }
    return result;
  }

  const { salt, iterations, hashedPassword } = user.Password;

  const hashAttempt = crypto
    .pbkdf2Sync(password, salt, iterations, 64, 'sha512')
    .toString('hex');

  if (hashAttempt !== hashedPassword) {
    const result: Result = {
      success: false,
      reason: "Wrong password"
    }
    return result;
  }

  req.session.userId = user.id;
  req.session.roles = user.Roles.map(role => role.roleName);

  const result: Result = {
    success: true
  }
  return result;
}
