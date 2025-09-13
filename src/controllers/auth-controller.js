import jwt from 'jsonwebtoken';
import { register, authenticate } from '../services/auth-service.js';

export function signToken(payload, cb) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '0d';
  jwt.sign(payload, secret, { expiresIn }, cb);
}

export function setAuthCookie(res, token) {
  const name   = process.env.COOKIE_NAME || 'auth';
  const secure = String(process.env.COOKIE_SECURE || 'false') === 'true';
  res.cookie(name, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    maxAge: 23 * 60 * 60 * 1000,
    path: '/',
  });
}

export function getSignup(req, res) {
  res.render('auth/signup');
}

export function getLogin(req, res) {
  res.render('auth/login');
}

export function postSignup(req, res, next) {
  const { email, password, first_name, last_name, phone } = req.body;

  register({ email, password, first_name, last_name, phone }, (err, publicUser) => {
    if (err) {
      if (err.code === 'EMAIL_TAKEN') return res.status(409).send(err.message);
      return next(err);
    }
    const payload = { sub: publicUser.user_id, email: publicUser.email,
                      first_name: publicUser.first_name, last_name: publicUser.last_name,
                      phone: publicUser.phone };
    signToken(payload, (err2, token) => {
      if (err2) return next(err2);
      setAuthCookie(res, token);
      res.redirect('/users/profile');
    });
  });
}

export function postLogin(req, res, next) {
  const { email, password } = req.body;

  authenticate({ email, password }, (err, publicUser) => {
    if (err) {
      if (err.code === 'AUTH_FAILED') return res.status(401).send(err.message);
      return next(err);
    }
    const payload = { sub: publicUser.user_id, email: publicUser.email,
                      first_name: publicUser.first_name, last_name: publicUser.last_name,
                      phone: publicUser.phone };
    signToken(payload, (err2, token) => {
      if (err2) return next(err2);
      setAuthCookie(res, token);
      res.redirect('/users/profile');
    });
  });
}

export function postLogout(req, res) {
  const name = process.env.COOKIE_NAME || 'auth';
  res.clearCookie(name, { path: '/' });
  res.redirect('/');
}
