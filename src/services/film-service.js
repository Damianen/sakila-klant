import * as FilmRepo from "../repositories/film-repository.js";

export function GetAllFilms(callback) {
    FilmRepo.GetAllFilms(callback);
}
