import { routesAuth } from "@api/auth/infrastructure/routes/auth.routes";
import { routesUsers } from "@api/users/infrastructure/routes/users.routes";
import { routesRoles } from "@api/roles/infrastructure/routes/roles.routes";

export {
    routesAuth as auth,
    routesUsers as users,
    routesRoles as roles
};
