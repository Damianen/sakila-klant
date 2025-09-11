import pool from '../db/pool.js';

export function findAll(cb) {
  pool.query(
    'SELECT category_id, name FROM category ORDER BY name ASC',
    (err, rows) => cb(err, rows || [])
  );
}
