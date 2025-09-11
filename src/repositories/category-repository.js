import pool from '../db/pool.js';

export function findAll(callback) {
  pool.query(
    'SELECT category_id, name FROM category ORDER BY name ASC',
    (err, rows) => callback(err, rows || [])
  );
}
