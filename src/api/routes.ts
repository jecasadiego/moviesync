import { Router } from "express";
import config from "@app/config";
import {
  auth
} from "@api/v1.routes";

const routes = Router();

routes.get("/", (_, res) => {
  res.send(`Bienvenido esta es la API de MovieSync ${config.apiVersion}`);
});

routes.use("/auth", auth);







export default routes;

