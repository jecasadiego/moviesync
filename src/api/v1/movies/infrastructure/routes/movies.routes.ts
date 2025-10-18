
import { Router } from "express";
import { moviesController } from "@api/movies/infrastructure/services/movies.services";
import { asyncMiddleware } from "@app/utils/middlewares";
import multer from "multer";


const upload = multer({ storage: multer.memoryStorage() });


export const routesMovies = Router();

routesMovies.get("/", asyncMiddleware(moviesController.listMovies));
routesMovies.get("/:id", asyncMiddleware(moviesController.getMoviesById));
routesMovies.post("/create", asyncMiddleware(moviesController.createMovies));
routesMovies.put("/update/:id", asyncMiddleware(moviesController.updateMovies));
routesMovies.delete("/delete/:id", asyncMiddleware(moviesController.deleteMovies));
routesMovies.put("/restore/:id", asyncMiddleware(moviesController.restoreMovies));
routesMovies.post("/upload-images/:id", upload.array("files"), asyncMiddleware(moviesController.uploadImageForMovie));
