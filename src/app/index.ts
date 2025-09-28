// Dependence need
import express from "express";
import config from "@app/config";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// Config cors
import { corsOptions } from "@app/utils/cors";

// Routes
import routes from "@app/api/routes";
import { swaggerSpec, swaggerUi } from "@app/app/swagger";

const app = express();

// settings
app.set("port", config.port ?? 8080);
app.set("trust proxy", 1); // Déjalo en 1 solo si estás detrás de proxy/app service

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(morgan("combined"));

console.log("--------------------------");

// Home
app.get("/", (_req, res) => {
  res.send("Bienvenido este es el backend de la aplicación de IDBFORM EDUTECT v.0.1.0");
});

// API
app.use("/api/v1", routes);

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404: catch-all (sin '*')
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Error handler (debe ir al final y con 4 args)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500).send({ error: err?.message ?? "Internal Server Error" });
});

const init = async () => {
  try {
    app.listen(app.get("port"), () => {
      console.log(`Server in ${config.node} mode on port ${app.get("port")}`);
      const baseUrl = `${config.baseUrl}:${app.get("port")}`;

      if (config.node === "local") {
        console.log(`API is available at ${baseUrl}/api/v1`);
        console.log(`Swagger is available at ${baseUrl}/docs`);
      }

      if (config.node === "development") {
        console.log(`API is available at ${baseUrl}/api/v1`);
        console.log(`Swagger is available at ${baseUrl}/docs`);
      }
      console.log("--------------------------");
    });
  } catch (error) {
    console.error(error);
  }
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(0);
});

export { init };
