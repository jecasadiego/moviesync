
import { Request, Response } from 'express';
import { FileTypesUseCase } from '@api/fileTypes/application/fileTypes.usecase';
import { warning, fromStatusAndCode } from '@app/utils/shared/responses';
import { ECodeHTTPStatus, EErrorMessage } from '@app/utils/shared/enums';

export class FileTypesController {
    constructor(private readonly fileTypesUseCase: FileTypesUseCase) {}

    public listFileTypes = async ({ method }: Request, res: Response) => {
        try {
            const filetypes  = await this.fileTypesUseCase.listFileTypes();
            fromStatusAndCode(res, filetypes, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public getFileTypesById = async ({ params: { id }, method }: Request, res: Response) => {
        try {
            const filetypes  = await this.fileTypesUseCase.getFileTypesById(+id);
            if (!filetypes ) {
                return warning(res, EErrorMessage.NOT_FOUND_ERROR, ECodeHTTPStatus.NOT_FOUND, "FileTypes not found");
            }
            fromStatusAndCode(res, filetypes, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };
}
