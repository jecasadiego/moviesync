import { Router } from "express";
import config from "@app/config";

const routes = Router();

routes.get("/", (_, res) => {
  res.send(`Bienvenido esta es la API de MovieSync ${config.apiVersion}`);
});

export default routes;
