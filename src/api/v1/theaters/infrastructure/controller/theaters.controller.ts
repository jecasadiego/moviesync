
import { Request, Response } from 'express';
import { TheatersUseCase } from '@api/theaters/application/theaters.usecase';
import { warning, fromStatusAndCode } from '@app/utils/shared/responses';
import { ECodeHTTPStatus, EErrorMessage } from '@app/utils/shared/enums';
import { getIdUserLogged } from '@app/utils/validations';

export class TheatersController {
    constructor(private readonly theatersUseCase: TheatersUseCase) { }

    public listTheaters = async ({ method }: Request, res: Response) => {
        try {
            const theaters = await this.theatersUseCase.listTheaters();
            fromStatusAndCode(res, theaters, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public getTheatersById = async ({ params: { id }, method }: Request, res: Response) => {
        try {
            const theaters = await this.theatersUseCase.getTheatersById(+id);
            if (!theaters) {
                return warning(res, EErrorMessage.NOT_FOUND_ERROR, ECodeHTTPStatus.NOT_FOUND, "Theaters not found");
            }
            fromStatusAndCode(res, theaters, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public createTheaters = async ({ body, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            const theaters = await this.theatersUseCase.createTheaters(body, idUserLogged);
            fromStatusAndCode(res, theaters, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.CREATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public updateTheaters = async ({ params: { id }, body, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            const theaters = await this.theatersUseCase.updateTheaters(+id, body, idUserLogged);
            fromStatusAndCode(res, theaters, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.UPDATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public deleteTheaters = async ({ params: { id }, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            await this.theatersUseCase.deleteTheaters(+id, idUserLogged);
            fromStatusAndCode(res, [], method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.DELETE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public restoreTheaters = async ({ params: { id }, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            await this.theatersUseCase.restoreTheaters(+id, idUserLogged);
            fromStatusAndCode(res, [], method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.UPDATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };
}
