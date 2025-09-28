
import { Request, Response, NextFunction } from "express";
import { codeHTTPStatus } from "@app/utils/constants/responses";
import { EErrorMessage } from "@app/utils/shared/enums";
import { verifyTokenRoute } from "@app/utils/token";
import { rolesUseCase } from "@api/roles/infrastructure/services/roles.services";

export const asyncMiddleware = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const validateTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token)
        return res
            .status(codeHTTPStatus.UNAUTHORIZED)
            .json({ message: EErrorMessage.NOT_FOUND_TOKEN });

    try {
        const isValidToken = verifyTokenRoute(token);

        if (!isValidToken.valid)
            return res.status(codeHTTPStatus.UNAUTHORIZED).json({
                message: `${EErrorMessage.INVALID_TOKEN} o ${EErrorMessage.NOT_FOUND_TOKEN_EXPIRED}`,
            });

        return next();
    } catch (error) {
        console.error("Token validation error:", error);
        return res
            .status(codeHTTPStatus.UNAUTHORIZED)
            .json({ message: EErrorMessage.NOT_FOUND_TOKEN_EXPIRED });
    }
};

export const validateAdminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token)
        return res
            .status(codeHTTPStatus.UNAUTHORIZED)
            .json({ message: EErrorMessage.NOT_FOUND_TOKEN });

    try {
        const isValidToken = verifyTokenRoute(token);

        if (!isValidToken.valid)
            return res.status(codeHTTPStatus.UNAUTHORIZED).json({
                message: `${EErrorMessage.INVALID_TOKEN} o ${EErrorMessage.NOT_FOUND_TOKEN_EXPIRED}`,
            });

        const role = await rolesUseCase.getRolesById(isValidToken.decoded.roleId);

        if (role?.sys_role_name_slug_i_value !== "admin")
            return res.status(codeHTTPStatus.FORBIDDEN).json({
                message: EErrorMessage.FORBIDDEN,
            });



        return next();
    } catch (error) {
        console.error("Token validation error:", error);
        return res
            .status(codeHTTPStatus.UNAUTHORIZED)
            .json({ message: EErrorMessage.NOT_FOUND_TOKEN_EXPIRED });
    }
};