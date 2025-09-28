import { Router } from "express";
import config from "@app/config";
import {
  auth,
  users,
  roles
} from "@api/v1.routes";
import { validateTokenMiddleware } from "@app/utils/middlewares";

const routes = Router();

routes.get("/", (_, res) => {
  res.send(`Bienvenido esta es la API de MovieSync ${config.apiVersion}`);
});

routes.use("/auth", auth);
routes.use("/roles", roles);
routes.use(validateTokenMiddleware);
routes.use("/users", users);








export default routes;

