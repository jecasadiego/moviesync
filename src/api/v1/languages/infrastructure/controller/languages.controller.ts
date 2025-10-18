
import { Request, Response } from 'express';
import { LanguagesUseCase } from '@api/languages/application/languages.usecase';
import { warning, fromStatusAndCode } from '@app/utils/shared/responses';
import { ECodeHTTPStatus, EErrorMessage } from '@app/utils/shared/enums';

export class LanguagesController {
    constructor(private readonly languagesUseCase: LanguagesUseCase) {}

    public listLanguages = async ({ method }: Request, res: Response) => {
        try {
            const languages  = await this.languagesUseCase.listLanguages();
            fromStatusAndCode(res, languages, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public getLanguagesById = async ({ params: { id }, method }: Request, res: Response) => {
        try {
            const languages  = await this.languagesUseCase.getLanguagesById(+id);
            if (!languages ) {
                return warning(res, EErrorMessage.NOT_FOUND_ERROR, ECodeHTTPStatus.NOT_FOUND, "Languages not found");
            }
            fromStatusAndCode(res, languages, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };
}
