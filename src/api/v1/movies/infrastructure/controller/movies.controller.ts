
import { Request, Response } from 'express';
import { MoviesUseCase } from '@api/movies/application/movies.usecase';
import { warning, fromStatusAndCode } from '@app/utils/shared/responses';
import { ECodeHTTPStatus, EErrorMessage } from '@app/utils/shared/enums';
import { getIdUserLogged } from '@app/utils/validations';

export class MoviesController {
    constructor(private readonly moviesUseCase: MoviesUseCase) { }

    public listMovies = async ({ method }: Request, res: Response) => {
        try {
            const movies = await this.moviesUseCase.listMovies();
            fromStatusAndCode(res, movies, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public getMoviesById = async ({ params: { id }, method }: Request, res: Response) => {
        try {
            const movies = await this.moviesUseCase.getMoviesById(+id);
            if (!movies) {
                return warning(res, EErrorMessage.NOT_FOUND_ERROR, ECodeHTTPStatus.NOT_FOUND, "Movies not found");
            }
            fromStatusAndCode(res, movies, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.GET_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public createMovies = async ({ body, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            const movies = await this.moviesUseCase.createMovies(body, idUserLogged);
            fromStatusAndCode(res, movies, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.CREATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public updateMovies = async ({ params: { id }, body, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            const movies = await this.moviesUseCase.updateMovies(+id, body, idUserLogged);
            fromStatusAndCode(res, movies, method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.UPDATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public deleteMovies = async ({ params: { id }, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            await this.moviesUseCase.deleteMovies(+id, idUserLogged);
            fromStatusAndCode(res, [], method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.DELETE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };

    public restoreMovies = async ({ params: { id }, method, headers }: Request, res: Response) => {
        try {
            const idUserLogged = getIdUserLogged(headers.authorization);
            await this.moviesUseCase.restoreMovies(+id, idUserLogged);
            fromStatusAndCode(res, [], method);
        } catch (error: unknown) {
            const errorAsError = error as Error;
            return warning(res, EErrorMessage.UPDATE_DATA_ERROR, ECodeHTTPStatus.INTERNAL_SERVER_ERROR, errorAsError.message);
        }
    };
}
