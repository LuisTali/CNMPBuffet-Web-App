import {Router} from 'express';
const router = Router();

import {login,registerUser,showLogin} from '../controllers/Auth'

router.get('/showLogin',showLogin);
router.post('/login',login);
router.post('/register',registerUser);

export default router;