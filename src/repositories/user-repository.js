import pool from '../db/pool.js';

export function findByEmail(email, callback) {
  pool.query(
    'SELECT * FROM app_user WHERE email = ? LIMIT 1',
    [email],
    (err, rows) => callback(err, rows && rows[0] ? rows[0] : null)
  );
}

export function findById(user_id, callback) {
  pool.query(
    'SELECT * FROM app_user WHERE user_id = ? LIMIT 1',
    [user_id],
    (err, rows) => {
      if (err) return callback(err);
      const row = rows && rows[0] ? rows[0] : null;
      if (row && row.password_hash != null && Buffer.isBuffer(row.password_hash)) {
        row.password_hash = row.password_hash.toString('utf8');
      }
      callback(null, row);
    }
  );
}

export function create(user, callback) {
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
    if (err) return callback(err);
    callback(null, { user_id: result.insertId });
  });
}

export function updateById(user_id, patch, callback) {
  const fields = [];
  const values = [];
  if (patch.email !== undefined)       { fields.push('email = ?');         values.push(patch.email); }
  if (patch.password_hash !== undefined){ fields.push('password_hash = ?'); values.push(patch.password_hash); }
  if (patch.first_name !== undefined)  { fields.push('first_name = ?');     values.push(patch.first_name || null); }
  if (patch.last_name !== undefined)   { fields.push('last_name = ?');      values.push(patch.last_name  || null); }
  if (patch.phone !== undefined)       { fields.push('phone = ?');          values.push(patch.phone      || null); }
  if (patch.is_active !== undefined)   { fields.push('is_active = ?');      values.push(patch.is_active ? 1 : 0); }

  if (fields.length === 0) return callback(null, { affectedRows: 0 });

  const sql = `UPDATE app_user SET ${fields.join(', ')} WHERE user_id = ?`;
  values.push(user_id);

  pool.query(sql, values, (err, result) => {
    if (err) return callback(err);
    callback(null, { affectedRows: result.affectedRows });
  });
}

export function deleteById(user_id, callback) {
  pool.query('DELETE FROM app_user WHERE user_id = ?', [user_id], (err, result) => {
    if (err) return callback(err);
    callback(null, { affectedRows: result.affectedRows });
  });
}
