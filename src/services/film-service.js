import * as FilmRepo from "../repositories/film-repository.js";
import { GetStoresAvailableFilm } from "../repositories/store-repository.js";

export function GetFilms({ page = 1, size = 20, categoryId, categoryName }, callback) {
  const limit = Math.min(Math.max(+size || 20, 1), 100);
  const offset = (Math.max(+page || 1, 1) - 1) * limit;

  if (!categoryId && !categoryName) {
    FilmRepo.listAll({ offset, limit }, (err, items) => {
      if (err) return callback(err);
      FilmRepo.countAll((err2, total) => {
        if (err2) return callback(err2);
        callback(null, { items, total });
      });
    });
    return;
  }

  FilmRepo.listByCategory({ categoryId, categoryName, offset, limit }, (err, items) => {
    if (err) return callback(err);
    FilmRepo.countByCategory({ categoryId, categoryName }, (err2, total) => {
      if (err2) return callback(err2);
      callback(null, { items, total });
    });
  });
}

export function GetFilmById(id, callback) {
    const numberId = Number(id);
    FilmRepo.GetFilmById(numberId, callback);
}

export function GetAvailable(id, callback) {
    const numberId = Number(id);
    GetStoresAvailableFilm(numberId, callback);
}


