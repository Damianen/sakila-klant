import { describe, it, expect, vi } from 'vitest';
import * as AuthController from '../src/controllers/auth-controller.js';

describe('auth-controller', () => {
  it('signToken should sign a JWT with given payload', (done) => {
    process.env.JWT_SECRET = 'test_secret';
    process.env.JWT_EXPIRES_IN = '1d';
    const payload = { sub: 123, email: 'a@b.c' };

    AuthController.signToken(payload, (err, token) => {
      expect(err).toBeNull();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
      done();
    });
  });

  it('setAuthCookie should set httpOnly cookie and not expose token in body', () => {
    process.env.COOKIE_NAME = 'auth';
    process.env.COOKIE_SECURE = 'false';
    const res = { cookie: vi.fn() };
    AuthController.setAuthCookie(res, 'abc.def.ghi');
    expect(res.cookie).toHaveBeenCalledWith('auth', 'abc.def.ghi', expect.objectContaining({
      httpOnly: true, sameSite: 'lax', secure: false, path: '/'
    }));
  });
});
