import jwt from 'jsonwebtoken';

function getTokenFromReq(req) {
  const name = process.env.COOKIE_NAME || 'auth';
  if (req.cookies && req.cookies[name]) return req.cookies[name];
  const h = req.headers.authorization || '';
  if (h.startsWith('Bearer ')) return h.slice(7);
  return null;
}

export function requireAuth(req, res, next) {
  const token = getTokenFromReq(req);
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).send('Invalid or expired token');
    req.user = { user_id: payload.sub, email: payload.email || null };
    next();
  });
}

