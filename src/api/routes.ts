import { Router } from "express";
import config from "@app/config";
import {
  auth,
  users,
  roles,
  fileTypes,
  movies,
  theaters,
  backblaze,
  genericUrls
} from "@api/v1.routes";
import { validateTokenMiddleware } from "@app/utils/middlewares";

const routes = Router();

routes.get("/", (_, res) => {
  res.send(`Bienvenido esta es la API de MovieSync ${config.apiVersion}`);
});

routes.use("/auth", auth);
routes.use("/roles", roles);
// routes.use(validateTokenMiddleware);
routes.use("/users", users);
routes.use("/file-types", fileTypes);
routes.use("/movies", movies);
routes.use("/theaters", theaters);
routes.use("/backblaze", backblaze);
routes.use("/generic-urls", genericUrls);








export default routes;

