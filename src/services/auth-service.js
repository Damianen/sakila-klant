import bcrypt from 'bcrypt';
import { findByEmail, create as createUser } from '../repositories/user-repository.js';
import { countAll } from '../repositories/film-repository.js';

function toPublicUser(dbUser) {
  if (!dbUser) return null;
  return {
    user_id: dbUser.user_id,
    email: dbUser.email,
    first_name: dbUser.first_name || null,
    last_name: dbUser.last_name || null,
    phone: dbUser.phone || null,
    is_active: dbUser.is_active ? true : false,
    created_at: dbUser.created_at,
    updated_at: dbUser.updated_at,
  };
}

export function register({ email, password, first_name, last_name, phone }, callback) {
  if (!email || !password) return callback(new Error('Email and password are required.'));

  findByEmail(email, (err, existing) => {
    if (err) return callback(err);
    if (existing) {
      const e = new Error('Email already registered.');
      e.code = 'EMAIL_TAKEN';
      return callback(e);
    }

    const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
    bcrypt.hash(password, rounds, (err2, hash) => {
      if (err2) return callback(err2);

      createUser(
        { email, password_hash: hash, first_name, last_name, phone },
        (err3, created) => {
          if (err3) return callback(err3);

          findByEmail(email, (err4, userRow) => {
            if (err4) return cb(err4);
            callback(null, toPublicUser(userRow));
          });
        }
      );
    });
  });
}

export function authenticate({ email, password }, callback) {
  if (!email || !password) return callback(new Error('Email and password are required.'));

  findByEmail(email, (err, userRow) => {
    if (err) return callback(err);
    if (!userRow) {
      const e = new Error('Invalid credentials.');
      e.code = 'AUTH_FAILED';
      return callback(e);
    }

    const hash = Buffer.isBuffer(userRow.password_hash)
        ? userRow.password_hash.toString('utf8')
        : userRow.password_hash;

    bcrypt.compare(String(password), hash, (err2, ok) => {
      if (err2) return callback(err2);
      if (!ok) {
        const e = new Error('Invalid credentials.');
        e.code = 'AUTH_FAILED';
        return callback(e);
      }
      callback(null, toPublicUser(userRow));
    });
  });
}
