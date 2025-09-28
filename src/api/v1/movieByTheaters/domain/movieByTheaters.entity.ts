import { TNullableNumber, TNullableDate } from "@app/utils/shared/types";

export class MovieByTheaters {
  constructor(
    public movies_by_theater_id: number,
    public movies_by_theater_id_movie: TNullableNumber,
    public movies_by_theater_id_theater: TNullableNumber,
    public movies_by_theater_is_deleted: TNullableNumber,
    public movies_by_theater_create_date: TNullableDate,
    public movies_by_theater_update_date: TNullableDate,
    public movies_by_theater_id_user: TNullableNumber,
    public movies_by_theater_update_id_user: TNullableNumber,
    public movies_by_theater_create_id_user: TNullableNumber,
  ) {}
}


export interface IMovieByTheatersRepository {
  create(movieByTheatersData: Partial<MovieByTheaters>): Promise<MovieByTheaters>;
  findAll(): Promise<MovieByTheaters[]>;
  findById(id: number): Promise<MovieByTheaters | null>;
  update(id: number, movieByTheatersData: Partial<MovieByTheaters>): Promise<MovieByTheaters | null>;
  delete(id: number, idUserLogged: number): Promise<void>;
  restore(id: number, idUserLogged: number): Promise<void>;
}
