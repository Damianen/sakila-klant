import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import * as userController from "../controllers/user-controller.js";

const router = Router();

router.get('/profile', requireAuth, (req, res) => {
  res.render('users/profile', { user: req.user });
});

router.get('/edit', requireAuth, userController.getEditProfile);
router.post('/edit', requireAuth, userController.postUpdateProfile);

router.post('/delete', requireAuth, userController.postDeleteAccount);

export default router;

