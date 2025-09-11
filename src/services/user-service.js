import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user-repository.js';

export function toPublicUser(dbUser) {
  if (!dbUser) return null;
  return {
    user_id: dbUser.user_id,
    email: dbUser.email,
    first_name: dbUser.first_name || null,
    last_name: dbUser.last_name || null,
    phone: dbUser.phone || null,
    is_active: !!dbUser.is_active,
    created_at: dbUser.created_at,
    updated_at: dbUser.updated_at,
  };
}

export function getById(user_id, cb) {
  userRepository.findById(user_id, (err, row) => {
    if (err) return cb(err);
    cb(null, toPublicUser(row));
  });
}

export function updateAccount(user_id, { email, first_name, last_name, phone, new_password }, cb) {
  userRepository.findById(user_id, (err, current) => {
    if (err) return cb(err);
    if (!current) return cb(new Error('User not found'));

    function proceedWith(hashOrNull) {
      const patch = {
        email: email !== undefined ? email : undefined,
        first_name,
        last_name,
        phone,
        password_hash: hashOrNull !== undefined ? hashOrNull : undefined,
      };

      if (email && email !== current.email) {
        userRepository.findByEmail(email, (err2, existing) => {
          if (err2) return cb(err2);
          if (existing) {
            const e = new Error('Email already in use.');
            e.code = 'EMAIL_TAKEN';
            return cb(e);
          }
          userRepository.updateById(user_id, patch, afterUpdate);
        });
      } else {
        userRepository.updateById(user_id, patch, afterUpdate);
      }

      function afterUpdate(err3) {
        if (err3) return cb(err3);
        userRepository.findById(user_id, (err4, updatedRow) => {
          if (err4) return cb(err4);
          cb(null, toPublicUser(updatedRow));
        });
      }
    }

    if (new_password && new_password.length > 0) {
      const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
      bcrypt.hash(new_password, rounds, (errH, hash) => {
        if (errH) return cb(errH);
            proceedWith(hash);
      });
    } else {
      proceedWith(undefined);
    }
  });
}

export function removeAccount(user_id, cb) {
  userRepository.deleteById(user_id, (err, res) => {
    if (err) return cb(err);
    if (res.affectedRows === 0) return cb(new Error('User not found'));
    cb(null, { ok: true });
  });
}

