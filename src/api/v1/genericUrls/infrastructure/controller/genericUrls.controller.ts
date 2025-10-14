
import { Request, Response } from 'express';
import { GenericUrlsUseCase } from '@api/genericUrls/application/genericUrls.usecase';
import { warning, fromStatusAndCode } from '@app/utils/shared/responses';
import { ECodeHTTPStatus, EErrorMessage } from '@app/utils/shared/enums';
import { getIdUserLogged } from '@app/utils/validations';

export class GenericUrlsController {
    constructor(private readonly genericUrlsUseCase: GenericUrlsUseCase) {}

    public listGenericUrls = async ({ method }: Request, res: Response) => {
        try {
            const genericurls  = await this.genericUrlsUseCase.listGenericUrls();
            fromStatusAndCode(res, genericurls, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public getGenericUrlsById = async ({ params: { id }, method }: Request, res: Response) => {
        try {
            const genericurls  = await this.genericUrlsUseCase.getGenericUrlsById(+id);
            if (!genericurls ) {
                return warning(res, EErrorMessage.NOT_FOUND_ERROR, ECodeHTTPStatus.NOT_FOUND, "GenericUrls not found");
            }
            fromStatusAndCode(res, genericurls, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public createGenericUrls = async ({ body, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = await getIdUserLogged(headers.authorization);
            const genericurls  = await this.genericUrlsUseCase.createGenericUrls(body, idUserLogged);
            fromStatusAndCode(res, genericurls, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.CREATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public updateGenericUrls = async ({ params: { id }, body, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = await getIdUserLogged(headers.authorization);
            const genericurls  = await this.genericUrlsUseCase.updateGenericUrls(+id, body, idUserLogged);
            fromStatusAndCode(res, genericurls, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.UPDATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public deleteGenericUrls = async ({ params: { id }, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = await getIdUserLogged(headers.authorization);
            await this.genericUrlsUseCase.deleteGenericUrls(+id, idUserLogged);
            fromStatusAndCode(res, [], method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.DELETE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public restoreGenericUrls = async ({ params: { id }, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = await getIdUserLogged(headers.authorization);
            await this.genericUrlsUseCase.restoreGenericUrls(+id, idUserLogged);
            fromStatusAndCode(res, [], method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.UPDATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };
}
