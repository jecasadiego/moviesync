
import { Request, Response } from 'express';
import { UsersUseCase } from '@api/users/application/users.usecase';
import { warning, fromStatusAndCode } from '@app/utils/shared/responses';
import { ECodeHTTPStatus, EErrorMessage } from '@app/utils/shared/enums';
import { getIdUserLogged } from '@app/utils/validations';

export class UsersController {
    constructor(private readonly usersUseCase: UsersUseCase) {}

    public listUsers = async ({ method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            console.log(idUserLogged);
            const users  = await this.usersUseCase.listUsers();
            fromStatusAndCode(res, users, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public getUsersById = async ({ params: { id }, method }: Request, res: Response) => {
        try {
            const users  = await this.usersUseCase.getUsersById(+id);
            if (!users ) {
                return warning(res, EErrorMessage.NOT_FOUND_ERROR, ECodeHTTPStatus.NOT_FOUND, "Users not found");
            }
            fromStatusAndCode(res, users, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public createUsers = async ({ body, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            const users  = await this.usersUseCase.createUsers(body, idUserLogged);
            fromStatusAndCode(res, users, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.CREATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public updateUsers = async ({ params: { id }, body, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            const users  = await this.usersUseCase.updateUsers(+id, body, idUserLogged);
            fromStatusAndCode(res, users, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.UPDATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public deleteUsers = async ({ params: { id }, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            await this.usersUseCase.deleteUsers(+id, idUserLogged);
            fromStatusAndCode(res, [], method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.DELETE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public restoreUsers = async ({ params: { id }, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            await this.usersUseCase.restoreUsers(+id, idUserLogged);
            fromStatusAndCode(res, [], method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.UPDATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };
}
