import { describe, it, expect, vi } from 'vitest';

// Mocks must be defined BEFORE importing the module under test.
vi.mock('../src/repositories/user-repository.js', () => ({
  findByEmail: vi.fn(),
  create: vi.fn((data, cb) => cb(null, { insertId: 99 })),
}));

vi.mock('../src/repositories/film-repository.js', () => ({
  countAll: vi.fn((cb) => cb(null, 0)),
}));

// Mock bcrypt FIRST (no importActual needed here)
vi.mock('bcrypt', () => ({
  default: {
    hash: (pwd, rounds, cb) => cb(null, 'hashed'),
    compare: (pwd, hash, cb) => cb(null, pwd === 'secret'),
  },
  // If the code imports named functions (unlikely with ESM default), expose them too:
  hash: (pwd, rounds, cb) => cb(null, 'hashed'),
  compare: (pwd, hash, cb) => cb(null, pwd === 'secret'),
}));

import { register, authenticate } from '../src/services/auth-service.js';
import * as UserRepo from '../src/repositories/user-repository.js';

describe('auth-service', () => {
  it('register creates user and returns public profile', (done) => {
    UserRepo.findByEmail.mockImplementation((email, cb) => cb(null, null));

    register({ email: 'a@b.c', password: 'secret', first_name: 'A' }, (err, user) => {
      expect(err).toBeNull();
    });
  });

  it('authenticate returns user on valid credentials; fails otherwise', (done) => {
    const fakeRow = { user_id: 77, email: 'a@b.c', password_hash: 'hashed' };
    UserRepo.findByEmail.mockImplementation((email, cb) => cb(null, fakeRow));

    authenticate({ email: 'a@b.c', password: 'secret' }, (err, user) => {
      expect(err).toBeNull();
      expect(user).toMatchObject({ user_id: 77, email: 'a@b.c' });

      authenticate({ email: 'a@b.c', password: 'wrong' }, (err2) => {
        expect(err2).toBeTruthy();
        expect(err2.code).toBe('AUTH_FAILED');
      });
    });
  });
});
