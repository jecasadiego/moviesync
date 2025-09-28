import { Request, Response, NextFunction } from 'express';
import { AuthTokens } from '@api/auth/infrastructure/services/auth.services'; // ajusta ruta

export function authGuard(req: Request, res: Response, next: NextFunction): void {
  const header = req.header('Authorization');

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing token' });
    return; 
  }

  try {
    const token = header.slice(7).trim();
    const payload = AuthTokens.verifyAccess(token);
    (req as any).user = payload;
    return next();
  } catch {
    res.status(401).json({ message: 'Invalid/expired token' });
    return;
  }
}
