import * as userService from "../services/user-service.js";
import { signToken, setAuthCookie } from "./auth-controller.js";

export function getEditProfile(req, res, next) {
  const uid = req.user.user_id;
  userService.getById(uid, (err, user) => {
    if (err) return next(err);
    res.render('users/edit', { user, error: null });
  });
}

export function postUpdateProfile(req, res, next) {
  const uid = req.user.user_id;
  const { email, first_name, last_name, phone, new_password } = req.body;

  userService.updateAccount(uid, { email, first_name, last_name, phone, new_password }, (err, publicUser) => {
    if (err) {
      if (err.code === 'EMAIL_TAKEN') {
        return res.status(409).render('users/edit', { user: { ...req.body, user_id: uid }, error: err.message });
      }
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

export function postDeleteAccount(req, res, next) {
  const uid = req.user.user_id;
  userService.removeAccount(uid, (err) => {
    if (err) return next(err);
    const name = process.env.COOKIE_NAME || 'auth';
    res.clearCookie(name, { path: '/' });
    res.redirect('/');
  });
}

