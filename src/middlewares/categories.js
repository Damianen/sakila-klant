import { findAll as findAllCategories } from '../repositories/category-repository.js';

export default function categoriesMiddleware(req, res, next) {
  findAllCategories((err, categories) => {
    if (err) {
      res.locals.categories = [];
      return next();
    }
    res.locals.categories = categories || [];
    next();
  });
}
