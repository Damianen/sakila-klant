import * as FilmService from "../services/film-service.js";

export function ListFilms(req, res, next) {
    FilmService.GetAllFilms((err, films) => {
        if (err) return next(err);
        res.render("films", { items: films });
    });
}
