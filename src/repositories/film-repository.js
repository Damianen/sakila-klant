import pool from "../db/pool.js";

export function listAll({ offset = 0, limit = 50 }, cb) {
  const sql = `
    SELECT f.film_id, f.title, f.description, f.release_year
    FROM film f
    ORDER BY f.title ASC
    LIMIT ? OFFSET ?
  `;
  pool.query(sql, [limit, offset], (err, rows) => cb(err, rows || []));
}

export function countAll(cb) {
  pool.query('SELECT COUNT(*) AS total FROM film', (err, rows) => {
    if (err) return cb(err);
    cb(null, rows[0]?.total || 0);
  });
}
export function GetFilmById(id, callback) {
    const sql = `SELECT 
                      f.film_id,
                      f.title,
                      f.description,
                      f.release_year,
                      l.name AS language,
                      CONCAT(
                          '[', 
                          GROUP_CONCAT(
                              JSON_OBJECT('id', a.actor_id, 'name', CONCAT(a.first_name, ' ', a.last_name))
                              ORDER BY a.last_name
                          ), 
                          ']'
                      ) AS actors,
                      f.length,
                      f.rental_rate,
                      f.replacement_cost,
                      f.special_features
                  FROM film f
                  JOIN language l ON f.language_id = l.language_id
                  JOIN film_actor fa ON f.film_id = fa.film_id
                  JOIN actor a ON fa.actor_id = a.actor_id
                  WHERE f.film_id = ?
                  GROUP BY 
                      f.film_id, f.title, f.description, f.release_year, 
                      l.name, f.length, f.rental_rate, f.replacement_cost, f.special_features;`;
    pool.query(sql, [id], (err, rows) => {
        if (err) callback(err);
        callback(null, rows[0]);
    });
}


export function listByCategory({ categoryId, categoryName, offset = 0, limit = 50 }, cb) {
  const byId = `
    SELECT f.film_id, f.title, f.description, f.release_year
    FROM film f
    JOIN film_category fc ON fc.film_id = f.film_id
    JOIN category c ON c.category_id = fc.category_id
    WHERE c.category_id = ?
    ORDER BY f.title ASC
    LIMIT ? OFFSET ?
  `;
  const byName = `
    SELECT f.film_id, f.title, f.description, f.release_year
    FROM film f
    JOIN film_category fc ON fc.film_id = f.film_id
    JOIN category c ON c.category_id = fc.category_id
    WHERE c.name = ?
    ORDER BY f.title ASC
    LIMIT ? OFFSET ?
  `;
  if (categoryId) {
    pool.query(byId, [categoryId, limit, offset], (err, rows) => cb(err, rows || []));
  } else {
    pool.query(byName, [categoryName, limit, offset], (err, rows) => cb(err, rows || []));
  }
}

export function countByCategory({ categoryId, categoryName }, cb) {
  const byId = `
    SELECT COUNT(*) AS total
    FROM film f
    JOIN film_category fc ON fc.film_id = f.film_id
    WHERE fc.category_id = ?
  `;
  const byName = `
    SELECT COUNT(*) AS total
    FROM film f
    JOIN film_category fc ON fc.film_id = f.film_id
    JOIN category c ON c.category_id = fc.category_id
    WHERE c.name = ?
  `;
  const sql = categoryId ? byId : byName;
  const param = categoryId ? [categoryId] : [categoryName];
  pool.query(sql, param, (err, rows) => {
    if (err) return cb(err);
    cb(null, rows[0]?.total || 0);
  });
}