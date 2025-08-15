import jwt from 'jsonwebtoken';
import { config } from './config.js';

export interface JwtPayload {
  userId: number;
  email: string;
}

export function signJwt(payload: JwtPayload, expiresIn = '7d') {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn });
}

export function verifyJwt<T = JwtPayload>(token: string): T {
  return jwt.verify(token, config.JWT_SECRET) as T;
}
