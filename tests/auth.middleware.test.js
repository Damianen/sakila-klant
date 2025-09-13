import { describe, it, expect, vi } from 'vitest';
import { requireAuth } from '../src/middlewares/auth.js';
import jwt from 'jsonwebtoken';

describe('middlewares/auth.requireAuth', () => {
  it('returns 401 if no token present', () => {
    const req = { headers: {}, cookies: {} };
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() };
    const next = vi.fn();

    requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('accepts valid token and sets req.user', () => {
    process.env.JWT_SECRET = 'test_secret';
    const token = jwt.sign(
      { sub: 42, email: 'x@y.z', first_name: 'X', last_name: 'Y', phone: '123' },
      process.env.JWT_SECRET
    );
    const req = { headers: { authorization: `Bearer ${token}` }, cookies: {} };
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() };
    const next = vi.fn();

    requireAuth(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.user_id).toBe(42);
    expect(req.user.email).toBe('x@y.z');
  });
});
