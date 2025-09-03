import jwt from 'jsonwebtoken';

function getToken(req) {
  const cookieName = process.env.COOKIE_NAME || 'auth';
  if (req.cookies && req.cookies[cookieName]) return req.cookies[cookieName];
  const h = req.headers.authorization || '';
  if (h.startsWith('Bearer ')) return h.slice(7);
  return null;
}

export default function currentUser(req, res, next) {
  const token = getToken(req);
  if (!token) {
    res.locals.isAuthenticated = false;
    res.locals.currentUser = null;
    return next();
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      res.locals.isAuthenticated = false;
      res.locals.currentUser = null;
      return next();
    }
    // Minimal user shape for the UI; expand if you store more in the token
    res.locals.isAuthenticated = true;
    res.locals.currentUser = { user_id: payload.sub, email: payload.email || null };
    next();
  });
}

