import { Request, Response } from 'express';
import { AuthUseCase } from '@api/auth/application/auth.usecase';

const REFRESH_COOKIE = 'rtkn';

export class AuthController {
    constructor(private readonly uc = new AuthUseCase()) { }

    register = async (req: Request, res: Response) => {
        const { name, lastname, email, password, roleId } = req.body;
        const user = await this.uc.register({ name, lastname, email, password, roleId });
        return res.status(201).json(user);
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await this.uc.login({ email, password });

        res.cookie(REFRESH_COOKIE, refreshToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/api/auth',
        });

        return res.json({ accessToken, user });
    };

    me = async (req: Request, res: Response) => {
        const { sub } = (req as any).user;
        const u = await this.uc.me(sub);
        if (!u) return res.status(404).json({ message: 'User not found' });
        return res.json(u);
    };

    refresh = async (req: Request, res: Response) => {
        const token = req.cookies?.[REFRESH_COOKIE];
        if (!token) return res.status(401).json({ message: 'No refresh token' });
        try {
            const data = this.uc.refresh(token);
            return res.json(data);
        } catch {
            return res.status(401).json({ message: 'Invalid refresh' });
        }
    };

    logout = async (_req: Request, res: Response) => {
        res.clearCookie(REFRESH_COOKIE, { path: '/api/auth' });
        return res.json({ ok: true });
    };
}
