import { Router } from "express";
import * as FilmController from "../controllers/film-controller.js";

const router = Router();

router.get("/", FilmController.ListFilms);
router.get("/:id", FilmController.GetFilm);

export default router;
