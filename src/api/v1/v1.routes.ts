import { routesAuth } from "@api/auth/infrastructure/routes/auth.routes";
import { routesUsers } from "@api/users/infrastructure/routes/users.routes";
import { routesRoles } from "@api/roles/infrastructure/routes/roles.routes";
import { routesFileTypes } from "@api/fileTypes/infrastructure/routes/fileTypes.routes";
import { routesMovies } from "@api/movies/infrastructure/routes/movies.routes";
import { routesTheaters } from "@api/theaters/infrastructure/routes/theaters.routes";

export {
    routesAuth as auth,
    routesUsers as users,
    routesRoles as roles,
    routesFileTypes as fileTypes,
    routesMovies as movies,
    routesTheaters as theaters
};
