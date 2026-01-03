import crypto from 'crypto';
import type { Request } from 'express';
import { User, Password, Role } from '../../infrastructure/models/index.js';
import { Result } from '../../types/result.js';
import type { SessionData } from 'express-session';

export default async function loginUserService(
  email: string,
  username: string,
  password: string,
  req: Request
): Promise<Result> {

  const user = await User.findOne({
    where: { email },
    include: [Password, Role],
  }) as any;

  if (!user || !user.Password) {
    return {
      success: false,
      reason: "Account doesn't exist"
    };
  }

  if (user.username !== username) {
    return {
      success: false,
      reason: "Username does not match"
    };
  }

  const { salt, iterations, hashedPassword } = user.Password;

  const hashAttempt = crypto
    .pbkdf2Sync(password, salt, iterations, 64, 'sha512')
    .toString('hex');

  if (hashAttempt !== hashedPassword) {
    return {
      success: false,
      reason: "Wrong password"
    };
  }

  const session = req.session as SessionData & {
    userId?: number;
    roles?: string[];
  };

  session.userId = user.id;
  session.roles = user.Roles.map((role: any) => role.roleName);

  return {
    success: true
  };
}
