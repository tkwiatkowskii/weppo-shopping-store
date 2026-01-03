import type { Request, Response, NextFunction } from 'express';
import type { SessionData } from 'express-session';

export default function isAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = req.session as SessionData & { userId?: number; roles?: string[] };

  if (!session.userId) {
    return res.redirect('/login');
  }

  if (!session.roles || !session.roles.includes('admin')) {
    return res.status(403).json({
      message: 'Access denied'
    });
  }

  next();
}
