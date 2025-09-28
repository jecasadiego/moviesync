// Recomendado: quita el paquete de tipos antiguo si lo tienes instalado
// npm rm @types/jsonwebtoken

import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export type AppJwtPayload = { sub: number; email: string; roleId?: number | null };

const ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET as string;

const ACCESS_EXP = (process.env.JWT_ACCESS_EXPIRES ?? '15m') as SignOptions['expiresIn'];
const REFRESH_EXP = (process.env.JWT_REFRESH_EXPIRES ?? '7d') as SignOptions['expiresIn'];

export const AuthCrypto = {
    hash: (plain: string) => bcrypt.hash(plain, 10),
    compare: (plain: string, hash: string) => bcrypt.compare(plain, hash),
};

export const AuthTokens = {
    signAccess: (p: AppJwtPayload) =>
        jwt.sign(p, ACCESS_SECRET, { expiresIn: ACCESS_EXP, algorithm: 'HS256' }),
    signRefresh: (p: AppJwtPayload) =>
        jwt.sign(p, REFRESH_SECRET, { expiresIn: REFRESH_EXP, algorithm: 'HS256' }),

    verifyAccess: (t: string): AppJwtPayload => {
        const decoded = jwt.verify(t, ACCESS_SECRET);
        if (typeof decoded === 'string') throw new Error('Invalid token payload');
        return (decoded as unknown) as AppJwtPayload;
    },

    verifyRefresh: (t: string): AppJwtPayload => {
        const decoded = jwt.verify(t, REFRESH_SECRET);
        if (typeof decoded === 'string') throw new Error('Invalid token payload');
        // Menos recomendado (sin validación):
        return (decoded as unknown) as AppJwtPayload;
    },
};
