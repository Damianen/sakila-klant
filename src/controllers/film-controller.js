import * as FilmService from "../services/film-service.js";

export async function ListFilms(req, res, next) {
    FilmService.GetAllFilms((err, films) => {
        if (err) next(err);
        res.render("films", { items: films });
    });
}

export async function GetFilm(req, res, next) {
    const id = req.params['id'];
    FilmService.GetFilmById(id, (err, film) => {
        if (err) next(err);
        res.render("films/film", { item: film });
    });
}
