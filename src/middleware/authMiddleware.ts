import type { Request, Response, NextFunction } from 'express';
import type { SessionData } from 'express-session';

export default function authMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction) {
  const session = req.session as SessionData & { userId?: number; roles?: string[] };
  
  if (!session.userId) {
    return res.redirect('/login');
  }

  next();
}