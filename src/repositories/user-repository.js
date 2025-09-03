import pool from '../db/pool.js';

export function findByEmail(email, cb) {
  pool.query(
    'SELECT * FROM app_user WHERE email = ? LIMIT 1',
    [email],
    (err, rows) => cb(err, rows && rows[0] ? rows[0] : null)
  );
}

export function create(user, cb) {
  const sql = `
    INSERT INTO app_user (email, password_hash, first_name, last_name, phone)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [
    user.email,
    user.password_hash,
    user.first_name || null,
    user.last_name  || null,
    user.phone      || null,
  ];
  pool.query(sql, params, (err, result) => {
    if (err) return cb(err);
    cb(null, { user_id: result.insertId });
  });
}

