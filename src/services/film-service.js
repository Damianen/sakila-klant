import * as FilmRepo from "../repositories/film-repository.js";

export function GetAllFilms(callback) {
    FilmRepo.GetAllFilms(callback);
}

export async function GetFilmById(id, callback) {
    const numberId = Number(id);
    FilmRepo.GetFilmById(numberId, callback);
}
