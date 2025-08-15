import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../util/jwt.js';

export interface AuthedRequest extends Request {
  user?: { userId: number; email: string };
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }
  try {
    const token = header.split(' ')[1];
    const payload = verifyJwt(token);
    req.user = { userId: payload.userId, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
