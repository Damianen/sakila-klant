import { Router } from 'express';
import {
  getSignup, getLogin, postSignup, postLogin, postLogout
} from '../controllers/auth-controller.js';

const router = Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);

router.get('/login', getLogin);
router.post('/login', postLogin);

router.post('/logout', postLogout);

export default router;

