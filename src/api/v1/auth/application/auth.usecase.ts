import { AuthRepository } from '@api/auth/infrastructure/repository/auth.repository';
import { AuthCrypto, AuthTokens } from '@api/auth/infrastructure/services/auth.services';
import { LoginDTO, RegisterDTO, PublicUser } from '@api/auth/domain/auth.entity';

const mapPublic = (r: any): PublicUser => ({
    id: r.sys_user_id,
    name: r.sys_user_name,
    lastname: r.sys_user_lastname,
    email: r.sys_user_email,
    roleId: r.sys_user_id_role,
});

export class AuthUseCase {
    constructor(private readonly repo = new AuthRepository()) { }

    async register(input: RegisterDTO): Promise<PublicUser> {
        const exists = await this.repo.findActiveUserByEmail(input.email);
        if (exists) throw new Error('Email ya está registrado');
        const hash = await AuthCrypto.hash(input.password);
        const u = await this.repo.createUser({
            name: input.name,
            lastname: input.lastname,
            email: input.email,
            passwordHash: hash,
            roleId: input.roleId ?? null,
            createdBy: input.createdBy ?? null,
        });
        return mapPublic(u);
    }

    async login(input: LoginDTO) {
        const user = await this.repo.findActiveUserByEmail(input.email);
        if (!user) throw new Error('Credenciales inválidas (Email)');
        const ok = await AuthCrypto.compare(input.password, user.sys_user_password as string);
        if (!ok) throw new Error('Credenciales inválidas (Contraseña)');

        const payload = {
            sub: user.sys_user_id,
            email: user.sys_user_email as string,
            roleId: user.sys_user_id_role ,
        };

        const accessToken = AuthTokens.signAccess(payload);
        const refreshToken = AuthTokens.signRefresh(payload);
        return { accessToken, refreshToken, user: mapPublic(user) };
    }

    async me(userId: number) {
        const u = await this.repo.findPublicById(userId);
        return u ? mapPublic(u) : null;
    }

    refresh(refreshToken: string) {
        const payload = AuthTokens.verifyRefresh(refreshToken);
        const accessToken = AuthTokens.signAccess({
            sub: payload.sub,
            email: payload.email,
            roleId: payload.roleId ?? null,
        });
        return { accessToken };
    }
}
