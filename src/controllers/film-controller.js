import * as FilmService from "../services/film-service.js";

export async function ListFilms(req, res, next) {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const size = Math.min(Math.max(parseInt(req.query.size || '20', 10), 1), 100);

  const categoryId = req.query.category_id ? Number(req.query.category_id) : null;
  const categoryName = req.query.category || null;

  FilmService.GetFilms({ page, size, categoryId, categoryName }, (err, result) => {
    if (err) return next(err);

    const total = result.total;
    const totalPages = Math.max(Math.ceil(total / size), 1);
    const currentPage = Math.min(page, totalPages);

    const params = new URLSearchParams();
    params.set('size', String(size));
    if (categoryId) params.set('category_id', String(categoryId));
    else if (categoryName) params.set('category', categoryName);
    const baseQuery = params.toString();
    const windowSize = 5;
    const half = Math.floor(windowSize / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + windowSize - 1, totalPages);
    start = Math.max(end - windowSize + 1, 1);

    const pages = [];
    for (let p = start; p <= end; p++) pages.push(p);

    res.render('films/index', {
      items: result.items,
      total,
      size,
      page: currentPage,
      totalPages,
      pages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
      prevPage: Math.max(currentPage - 1, 1),
      nextPage: Math.min(currentPage + 1, totalPages),
      baseQuery,
      selectedCategoryId: categoryId,
      selectedCategoryName: categoryName
    });
  });
}

export async function GetFilm(req, res, next) {
    const id = req.params['id'];
    FilmService.GetFilmById(id, (err, film) => {
        if (err) next(err);
        film.actors = JSON.parse(film.actors);
        res.render("films/film", { item: film });
    });
}

export async function GetAvailable(req, res, next) {
    const id = req.params['id'];
    FilmService.GetAvailable(id, (err, stores) => {
        if (err) next(err);
        res.render("films/available", { items: stores });
    });
}
