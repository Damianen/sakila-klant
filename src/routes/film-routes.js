import { Router } from "express";
import * as FilmController from "../controllers/film-controller.js";

const router = Router();

router.get("/", FilmController.ListFilms);

export default router;
