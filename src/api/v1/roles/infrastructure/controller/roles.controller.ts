
import { Request, Response } from 'express';
import { RolesUseCase } from '@api/roles/application/roles.usecase';
import { warning, fromStatusAndCode } from '@app/utils/shared/responses';
import { ECodeHTTPStatus, EErrorMessage } from '@app/utils/shared/enums';
import { getIdUserLogged } from '@app/utils/validations';

export class RolesController {
    constructor(private readonly rolesUseCase: RolesUseCase) {}

    public listRoles = async ({ method }: Request, res: Response) => {
        try {
            const roles  = await this.rolesUseCase.listRoles();
            fromStatusAndCode(res, roles, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public getRolesById = async ({ params: { id }, method }: Request, res: Response) => {
        try {
            const roles  = await this.rolesUseCase.getRolesById(+id);
            if (!roles ) {
                return warning(res, EErrorMessage.NOT_FOUND_ERROR, ECodeHTTPStatus.NOT_FOUND, "Roles not found");
            }
            fromStatusAndCode(res, roles, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public createRoles = async ({ body, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            const roles  = await this.rolesUseCase.createRoles(body, idUserLogged);
            fromStatusAndCode(res, roles, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.CREATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public updateRoles = async ({ params: { id }, body, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            const roles  = await this.rolesUseCase.updateRoles(+id, body, idUserLogged);
            fromStatusAndCode(res, roles, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.UPDATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public deleteRoles = async ({ params: { id }, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            await this.rolesUseCase.deleteRoles(+id, idUserLogged);
            fromStatusAndCode(res, [], method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.DELETE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public restoreRoles = async ({ params: { id }, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            await this.rolesUseCase.restoreRoles(+id, idUserLogged);
            fromStatusAndCode(res, [], method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.UPDATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };
}
