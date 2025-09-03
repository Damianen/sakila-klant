import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/profile', requireAuth, (req, res) => {
  res.render('users/profile', { user: req.user });
});

export default router;

