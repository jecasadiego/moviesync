import { Router } from 'express';
import { AuthController } from '@api/auth/infrastructure/controller/auth.controller';
import { authGuard } from '@api/auth/infrastructure/middleware/auth.middleware';

const authController = new AuthController();
export const routesAuth = Router();

routesAuth.post('/register', authController.register);
routesAuth.post('/login', authController.login);
routesAuth.post('/refresh', authController.refresh);
routesAuth.post('/logout', authController.logout);
routesAuth.get('/me', authGuard, authController.me);
